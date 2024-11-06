import { Component, OnInit, Type } from '@angular/core';
import { Individual } from '../../models/individual.model';
import { LegalEntity } from '../../models/legal-entity.model';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LegalEntitiesTableComponent } from '../shared/legal-entities-table/legal-entities-table.component';
import { IndividualsTableComponent } from '../shared/individuals-table/individuals-table.component';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BENEFICIARY_TYPES } from '../../shared/constants';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {
  BeneficiaryType,
  setSelectedBeneficiaryType,
} from '../../store/beneficiaries-settings-store/beneficiary-settings.actions';

@Component({
  selector: 'app-manage-beneficiaries',
  standalone: true,
  imports: [
    LegalEntitiesTableComponent,
    IndividualsTableComponent,
    DropdownModule,
    FormsModule,
    NgComponentOutlet,
    RouterLink,
  ],
  templateUrl: './manage-beneficiaries.component.html',
  styleUrl: './manage-beneficiaries.component.scss',
})
export class ManageBeneficiariesComponent implements OnInit {
  dropdownBeneficiaryData = [
    { label: 'Individuals', value: BENEFICIARY_TYPES.INDIVIDUAL },
    { label: 'Legal Entities', value: BENEFICIARY_TYPES.LEGAL_ENTITY },
  ];
  selectedBeneficiaryType: { label: string; value: BeneficiaryType } | null =
    null;
  beneficiaries: Individual[] | LegalEntity[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('beneficiariesSettings').subscribe((state) => {
      const indexOfBeneficiaryData = this.dropdownBeneficiaryData.findIndex(
        (beneficiary) => beneficiary.value === state.selectedBeneficiaryType
      );
      this.selectedBeneficiaryType =
        this.dropdownBeneficiaryData[indexOfBeneficiaryData];
    });
  }

  onBeneficiaryTypeChange(selectedType: {
    label: string;
    value: BeneficiaryType;
  }): void {
    this.store.dispatch(
      setSelectedBeneficiaryType({ selectedType: selectedType.value })
    );
  }

  getBeneficiaryTableComponent(): Type<any> {
    return this.selectedBeneficiaryType?.value === BENEFICIARY_TYPES.INDIVIDUAL
      ? IndividualsTableComponent
      : LegalEntitiesTableComponent;
  }
}
