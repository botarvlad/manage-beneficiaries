import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as IndividualActions from '../../../store/individuals-store/individual.actions';
import * as LegalEntityActions from '../../../store/legal-entities-store/legal-entity.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { AngularIbanModule, ValidatorService } from 'angular-iban';
import { cnpValidator } from '../../shared/validators/cnp-validator';
import { cuiValidator } from '../../shared/validators/cui-validator';
import { BENEFICIARY_TYPES } from '../../../shared/constants';
import { LegalEntityDTO } from '../../../models/dtos/legal-entity-dto.model';
import { IndividualDTO } from '../../../models/dtos/individual-dto.model';
import { CamelCaseToSpacePipe } from '../../../shared/pipes/camel-case-to-space.pipe';
import { Individual } from '../../../models/individual.model';
import { LegalEntity } from '../../../models/legal-entity.model';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-beneficiary-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AngularIbanModule,
    CamelCaseToSpacePipe,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
  ],
  templateUrl: './beneficiary-edit.component.html',
  styleUrl: './beneficiary-edit.component.scss',
})
export class BeneficiaryEditComponent implements OnInit {
  beneficiaryForm!: FormGroup;
  id!: number;
  editMode: boolean = false;
  beneficiaryType!: string;
  BENEFICIARY_TYPES = BENEFICIARY_TYPES;
  beneficiaryTypeOptions = [
    { label: 'Individuals', value: BENEFICIARY_TYPES.INDIVIDUAL },
    { label: 'Legal Entities', value: BENEFICIARY_TYPES.LEGAL_ENTITY },
  ];

  // Getter for ibanAccounts FormArray
  get ibanAccounts(): FormArray {
    return this.beneficiaryForm.get('ibanAccounts') as FormArray;
  }

  constructor(
    private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.beneficiaryType = queryParams['type'];
    });
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private populateSharedData(data: Individual | LegalEntity): void {
    this.beneficiaryForm.patchValue({
      phone: data.phone,
      address: data.address,
      beneficiaryType: this.beneficiaryType,
    });

    const ibanArray = this.beneficiaryForm.get('ibanAccounts') as FormArray;
    ibanArray.clear();
    data.ibanAccounts?.forEach((iban) => {
      ibanArray.push(this.fb.control(iban, Validators.required));
    });
  }

  private loadIndividualData(): void {
    this.store.dispatch(IndividualActions.loadIndividual({ id: this.id }));
    this.store
      .select('individuals')
      .pipe(
        map((individualsState) => {
          return individualsState.individuals.find((individual) => {
            return individual.id === this.id;
          });
        })
      )
      .subscribe((individual) => {
        if (individual) {
          this.populateSharedData(individual);

          this.beneficiaryForm.patchValue({
            firstName: individual.firstName,
            lastName: individual.lastName,
            personalNumber: individual.personalNumber,
            birthDate: individual.birthDate,
          });
        }
      });
  }

  private loadLegalEntityData(): void {
    this.store.dispatch(LegalEntityActions.loadLegalEntity({ id: this.id }));
    this.store
      .select('legalEntities')
      .pipe(
        map((legalEntriesState) => {
          return legalEntriesState.legalEntities.find((legalEntity) => {
            return legalEntity.id === this.id;
          });
        })
      )
      .subscribe((legalEntity) => {
        if (legalEntity) {
          this.populateSharedData(legalEntity);

          this.beneficiaryForm.patchValue({
            name: legalEntity.name,
            registrationNumber: legalEntity.registrationNumber,
            establishmentDate: legalEntity.establishmentDate,
          });
        }
      });
  }

  private initForm(): void {
    this.beneficiaryForm = this.fb.group({
      phone: [''],
      address: [''],
      ibanAccounts: this.fb.array([]), // FormArray for multiple IBANs
      beneficiaryType: ['', Validators.required],
    });

    // Listen for changes in the beneficiaryType to dynamically add controls
    this.beneficiaryForm
      .get('beneficiaryType')
      ?.valueChanges.subscribe((type) => {
        this.onBeneficiaryTypeChange(type);
      });

    if (this.editMode) {
      if (this.beneficiaryType === BENEFICIARY_TYPES.INDIVIDUAL) {
        this.loadIndividualData();
      } else if (this.beneficiaryType === BENEFICIARY_TYPES.LEGAL_ENTITY) {
        this.loadLegalEntityData();
      }
    }
  }

  // Method to add a new IBAN control
  addIbanAccount(): void {
    this.ibanAccounts.push(
      this.fb.control('', [Validators.required, ValidatorService.validateIban])
    );
  }

  // Method to remove an IBAN control by index
  removeIbanAccount(index: number): void {
    this.ibanAccounts.removeAt(index);
  }

  // Adjust the form based on the selected beneficiary type
  private onBeneficiaryTypeChange(type: string): void {
    // Clear previously added controls
    const individualFields = [
      'firstName',
      'lastName',
      'personalNumber',
      'birthDate',
    ];
    const legalEntityFields = [
      'name',
      'registrationNumber',
      'establishmentDate',
    ];

    individualFields.forEach((field) => {
      if (this.beneficiaryForm.contains(field))
        this.beneficiaryForm.removeControl(field);
    });

    legalEntityFields.forEach((field) => {
      if (this.beneficiaryForm.contains(field))
        this.beneficiaryForm.removeControl(field);
    });

    // Add controls based on the selected type
    if (type === BENEFICIARY_TYPES.INDIVIDUAL) {
      this.beneficiaryForm.addControl(
        'firstName',
        this.fb.control('', Validators.required)
      );
      this.beneficiaryForm.addControl(
        'lastName',
        this.fb.control('', Validators.required)
      );
      this.beneficiaryForm.addControl(
        'personalNumber',
        this.fb.control('', [Validators.required, cnpValidator()])
      );
      this.beneficiaryForm.addControl('birthDate', this.fb.control(''));
    } else if (type === BENEFICIARY_TYPES.LEGAL_ENTITY) {
      this.beneficiaryForm.addControl(
        'name',
        this.fb.control('', Validators.required)
      );
      this.beneficiaryForm.addControl(
        'registrationNumber',
        this.fb.control('', [Validators.required, cuiValidator()])
      );
      this.beneficiaryForm.addControl('establishmentDate', this.fb.control(''));
    }
  }

  private saveBeneficiary(
    data: IndividualDTO | LegalEntityDTO,
    type: string
  ): void {
    // get the right action based on type of data and editMode
    const action =
      type === BENEFICIARY_TYPES.INDIVIDUAL
        ? this.editMode
          ? IndividualActions.updateIndividual({
              individual: { ...(data as Individual), id: this.id },
            })
          : IndividualActions.addIndividual({
              individual: data as IndividualDTO,
            })
        : this.editMode
        ? LegalEntityActions.updateLegalEntity({
            legalEntity: { ...(data as LegalEntity), id: this.id },
          })
        : LegalEntityActions.addLegalEntity({
            legalEntity: data as LegalEntityDTO,
          });

    this.store.dispatch(action);
  }

  onSubmit(): void {
    if (this.beneficiaryForm.valid) {
      const formData = this.beneficiaryForm.value;
      const beneficiaryType =
        this.beneficiaryForm.get('beneficiaryType')?.value;
      this.saveBeneficiary(formData, beneficiaryType);
      this.beneficiaryForm.markAsPristine();
      this.router.navigate(['beneficiaries']);
    }
  }
}
