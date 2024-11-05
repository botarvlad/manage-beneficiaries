import { NgFor, NgIf } from '@angular/common';
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
import { Individual } from '../../../models/individual.model';
import { LegalEntity } from '../../../models/legal-entity.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { AngularIbanModule, ValidatorService } from 'angular-iban';
import { cnpValidator } from '../../shared/validators/cnp-validator';
import { cuiValidator } from '../../shared/validators/cui-validator';

@Component({
  selector: 'app-beneficiary-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, AngularIbanModule],
  templateUrl: './beneficiary-edit.component.html',
  styleUrl: './beneficiary-edit.component.scss',
})
export class BeneficiaryEditComponent implements OnInit {
  beneficiaryForm!: FormGroup;
  id!: number;
  editMode: boolean = false;
  beneficiaryType!: string;

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

  private initForm() {
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
      if (this.beneficiaryType === 'individual') {
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
              this.beneficiaryForm.patchValue({
                phone: individual.phone,
                address: individual.address,
                beneficiaryType: this.beneficiaryType,
              });

              const ibanArray = this.beneficiaryForm.get(
                'ibanAccounts'
              ) as FormArray;
              ibanArray.clear();
              individual.ibanAccounts?.forEach((iban) => {
                ibanArray.push(this.fb.control(iban, Validators.required));
              });

              this.beneficiaryForm.patchValue({
                firstName: individual.firstName,
                lastName: individual.lastName,
                personalNumber: individual.personalNumber,
                birthDate: individual.birthDate,
              });
            }
          });
      } else if (this.beneficiaryType === 'legalEntity') {
        this.store.dispatch(
          LegalEntityActions.loadLegalEntity({ id: this.id })
        );
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
              this.beneficiaryForm.patchValue({
                phone: legalEntity.phone,
                address: legalEntity.address,
                beneficiaryType: this.beneficiaryType,
              });

              const ibanArray = this.beneficiaryForm.get(
                'ibanAccounts'
              ) as FormArray;
              ibanArray.clear();
              legalEntity.ibanAccounts?.forEach((iban) => {
                ibanArray.push(this.fb.control(iban));
              });

              this.beneficiaryForm.patchValue({
                name: legalEntity.name,
                registrationNumber: legalEntity.registrationNumber,
                establishmentDate: legalEntity.establishmentDate,
              });
            }
          });
      }
    }
  }

  // Getter for ibanAccounts FormArray
  get ibanAccounts(): FormArray {
    return this.beneficiaryForm.get('ibanAccounts') as FormArray;
  }

  // Method to add a new IBAN control
  addIbanAccount() {
    this.ibanAccounts.push(
      this.fb.control('', [Validators.required, ValidatorService.validateIban])
    );
  }

  // Method to remove an IBAN control by index
  removeIbanAccount(index: number) {
    this.ibanAccounts.removeAt(index);
  }

  // Adjust the form based on the selected beneficiary type
  private onBeneficiaryTypeChange(type: string) {
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
    if (type === 'individual') {
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
    } else if (type === 'legalEntity') {
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

  onSubmit() {
    if (this.beneficiaryForm.valid) {
      if (this.editMode) {
        if (
          this.beneficiaryForm.get('beneficiaryType')?.value === 'individual'
        ) {
          this.store.dispatch(
            IndividualActions.updateIndividual({
              individual: { ...this.beneficiaryForm.value, id: this.id },
            })
          );
        } else {
          this.store.dispatch(
            LegalEntityActions.updateLegalEntity({
              legalEntity: { ...this.beneficiaryForm.value, id: this.id },
            })
          );
        }
      } else {
        const formData = this.beneficiaryForm.value;
        // Dispatch the form data to the store or handle it as needed
        if (
          this.beneficiaryForm.get('beneficiaryType')?.value === 'individual'
        ) {
          const individual: Individual = {
            phone: formData.phone,
            address: formData.address,
            ibanAccounts: formData.ibanAccounts,
            firstName: formData.firstName,
            lastName: formData.lastName,
            personalNumber: formData.personalNumber,
            birthDate: formData.birthDate,
          };
          this.store.dispatch(IndividualActions.addIndividual({ individual }));
        }

        if (
          this.beneficiaryForm.get('beneficiaryType')?.value === 'legalEntity'
        ) {
          const legalEntity: LegalEntity = {
            phone: formData.phone,
            address: formData.address,
            ibanAccounts: formData.ibanAccounts,
            name: formData.name,
            registrationNumber: formData.registrationNumber,
            establishmentDate: formData.establishmentDate,
          };
          this.store.dispatch(
            LegalEntityActions.addLegalEntity({ legalEntity })
          );
        }
      }
      this.beneficiaryForm.markAsPristine();
      this.router.navigate(['beneficiaries']);
    }
  }
}
