import { Component, OnInit } from '@angular/core';
import { Beneficiary } from './models/beneficiary.model';
import { beneficiariesMock } from './beneficiariesMockData';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IndividualsTableComponent } from './tables/individuals-table/individuals-table.component';
import { CompanyTableComponent } from './tables/company-table/company-table.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [TableModule, ButtonModule, NgComponentOutlet],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.scss',
})
export class BeneficiariesComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  individuals: boolean = true;

  ngOnInit(): void {
    this.beneficiaries = beneficiariesMock;
  }

  getBeneficiaryTable() {
    return this.individuals ? IndividualsTableComponent : CompanyTableComponent;
  }

  toggleBeneficiaries() {
    this.individuals = !this.individuals;
  }
}
