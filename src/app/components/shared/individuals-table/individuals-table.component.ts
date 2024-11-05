import { Component, OnInit } from '@angular/core';
import { Individual } from '../../../models/individual.model';
import { TableModule } from 'primeng/table';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as IndividualActions from '../../../store/individuals-store/individual.actions';
import { selectAllIndividuals } from '../../../store/individuals-store/individual.selectors';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-individuals-table',
  standalone: true,
  imports: [TableModule],
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

  onViewRecord(recordId: string) {
    this.router.navigate([], {
      queryParams: { type: 'individual', id: recordId },
    });
  }

  onEditRecord(id: string) {
    this.router.navigate([id + '/edit'], {
      relativeTo: this.route,
      queryParams: { type: 'individual' },
    });
  }

  onDeleteRecord(id: number) {
    this.store.dispatch(IndividualActions.deleteIndividual({ id }));
  }
}
