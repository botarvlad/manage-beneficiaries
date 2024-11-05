import { Component, OnInit } from '@angular/core';
import { Individual } from '../../models/individual.model';
import { LegalEntity } from '../../models/legal-entity.model';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LegalEntitiesTableComponent } from '../shared/legal-entities-table/legal-entities-table.component';
import { IndividualsTableComponent } from '../shared/individuals-table/individuals-table.component';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  beneficiaryTypes = [{ name: 'individuals' }, { name: 'legal-entities' }];
  selectedBeneficiaryType = this.beneficiaryTypes[0];
  beneficiaries: Individual[] | LegalEntity[] = [];

  ngOnInit(): void {}

  getBeneficiaryTableComponent() {
    return this.selectedBeneficiaryType.name === 'individuals'
      ? IndividualsTableComponent
      : LegalEntitiesTableComponent;
  }
}
