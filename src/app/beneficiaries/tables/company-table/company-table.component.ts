import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/beneficiary.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-company-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.scss',
})
export class CompanyTableComponent implements OnInit {
  companies: Company[] = [];
  selectedCompanies: Company[] = [];

  ngOnInit(): void {
    this.companies = [
      new Company(
        1,
        '072939494943',
        'adresa 1',
        ['RO123981313', '0123819123'],
        'Company 1',
        'JO12313123123',
        new Date('2022-03-25')
      ),
      new Company(
        2,
        '072939494943',
        'adresa 2',
        ['RO123981313', '0123819123'],
        'Company 2',
        'JO12313123123',
        new Date('2022-03-25')
      ),
      new Company(
        3,
        '072939494943',
        'adresa 3',
        ['RO123981313', '0123819123'],
        'Company 3',
        'JO12313123123',
        new Date('2022-03-25')
      ),
    ];
  }
}
