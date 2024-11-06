import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as LegalEntityActions from '../../../store/legal-entities-store/legal-entity.actions';
import { LegalEntity } from '../../../models/legal-entity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAllLegalEntities } from '../../../store/legal-entities-store/legal-entity.selectors';
import { TableModule } from 'primeng/table';
import { BENEFICIARY_TYPES } from '../../../shared/constants';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-legal-entities-table',
  standalone: true,
  imports: [TableModule, ButtonModule, DatePipe],
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

  onEditRecord(id: string): void {
    this.router.navigate([id + '/edit'], {
      relativeTo: this.route,
      queryParams: { type: BENEFICIARY_TYPES.LEGAL_ENTITY },
    });
  }

  onDeleteRecord(id: number): void {
    this.store.dispatch(LegalEntityActions.deleteLegalEntity({ id }));
  }
}
