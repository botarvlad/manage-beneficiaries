import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Individual } from '../../../models/individual.model';
import { LegalEntity } from '../../../models/legal-entity.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() data: Individual[] | LegalEntity[] = [];

  columns: string[] = []; // Columns to be displayed in the table

  ngOnInit(): void {
    if (this.data.length > 0) {
      // Extract column names from the first data object
      this.columns = Object.keys(this.data[0]);
    }
  }
}
