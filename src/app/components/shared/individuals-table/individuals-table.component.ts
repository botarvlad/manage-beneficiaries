import { Component, OnInit } from '@angular/core';
import { Individual } from '../../../models/individual.model';
import { TableModule } from 'primeng/table';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as IndividualActions from '../../../store/individuals-store/individual.actions';
import { selectAllIndividuals } from '../../../store/individuals-store/individual.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { BENEFICIARY_TYPES } from '../../../shared/constants';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-individuals-table',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe],
  templateUrl: './individuals-table.component.html',
  styleUrl: './individuals-table.component.scss',
})
export class IndividualsTableComponent implements OnInit {
  individuals: Individual[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(IndividualActions.loadIndividuals());
    this.store
      .select(selectAllIndividuals)
      .subscribe((individuals) => (this.individuals = [...individuals]));
  }

  onEditRecord(id: string): void {
    this.router.navigate([id + '/edit'], {
      relativeTo: this.route,
      queryParams: { type: BENEFICIARY_TYPES.INDIVIDUAL },
    });
  }

  onDeleteRecord(id: number): void {
    this.store.dispatch(IndividualActions.deleteIndividual({ id }));
  }
}
