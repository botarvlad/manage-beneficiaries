import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as LegalEntityActions from '../../../store/legal-entities-store/legal-entity.actions';
import { LegalEntity } from '../../../models/legal-entity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAllLegalEntities } from '../../../store/legal-entities-store/legal-entity.selectors';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-legal-entities-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './legal-entities-table.component.html',
  styleUrl: './legal-entities-table.component.scss',
})
export class LegalEntitiesTableComponent {
  legalEntities: LegalEntity[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(LegalEntityActions.loadLegalEntities());
    this.store
      .select(selectAllLegalEntities)
      .subscribe((legalEntities) => (this.legalEntities = [...legalEntities]));
  }

  onViewRecord(recordId: string) {
    this.router.navigate([], {
      queryParams: { type: 'legalEntity', id: recordId },
    });
  }

  onEditRecord(id: string) {
    this.router.navigate([id + '/edit'], {
      relativeTo: this.route,
      queryParams: { type: 'legalEntity' },
    });
  }

  onDeleteRecord(id: number) {
    this.store.dispatch(LegalEntityActions.deleteLegalEntity({ id }));
  }
}
