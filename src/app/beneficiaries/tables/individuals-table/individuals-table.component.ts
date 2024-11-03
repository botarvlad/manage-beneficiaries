import { Component, OnInit } from '@angular/core';
import { Individual } from '../../models/beneficiary.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-individuals-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './individuals-table.component.html',
  styleUrl: './individuals-table.component.scss',
})
export class IndividualsTableComponent implements OnInit {
  individuals: Individual[] = [];

  ngOnInit(): void {
    this.individuals = [
      new Individual(
        1,
        '072939494943',
        'adresa 1',
        ['RO123981313', '0123819123'],
        'Alex',
        'Popescu',
        new Date('2022-03-25'),
        '1234567889'
      ),
      new Individual(
        2,
        '072939494943',
        'adresa 2',
        ['RO123981313', '0123819123'],
        'Alex',
        'Popescu',
        new Date('2022-03-25'),
        '1234567889'
      ),
      new Individual(
        3,
        '072939494943',
        'adresa 3',
        ['RO123981313', '0123819123'],
        'Alex',
        'Popescu',
        new Date('2022-03-25'),
        '1234567889'
      ),
    ];
  }
}
