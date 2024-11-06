import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { mergeMap, from, map, tap, catchError, of } from 'rxjs';
import * as LegalEntitiesActions from './legal-entity.actions';
import { LegalEntity } from '../../models/legal-entity.model';
@Injectable()
export class LegalEntitiesEffects {
  constructor(
    private actions$: Actions,
    private dbService: NgxIndexedDBService
  ) {}

  loadLegalEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalEntitiesActions.loadLegalEntities),
      mergeMap(() =>
        from(this.dbService.getAll<LegalEntity>('legalEntities')).pipe(
          map((legalEntities) =>
            LegalEntitiesActions.loadLegalEntitiesSuccess({ legalEntities })
          )
        )
      )
    )
  );

  addLegalEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalEntitiesActions.addLegalEntity),
      mergeMap(({ legalEntity }) =>
        from(this.dbService.add('legalEntities', legalEntity)).pipe(
          map((legalEntity) =>
            LegalEntitiesActions.addLegalEntitySuccess({ legalEntity })
          ),
          catchError((error) =>
            of(
              LegalEntitiesActions.addLegalEntityFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  updateLegalEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalEntitiesActions.updateLegalEntity),
      mergeMap(({ legalEntity }) =>
        from(this.dbService.update('legalEntities', legalEntity)).pipe(
          map((updatedLegalEntity) =>
            LegalEntitiesActions.updateLegalEntitySuccess({
              legalEntity: updatedLegalEntity,
            })
          ),
          catchError((error) =>
            of(
              LegalEntitiesActions.updateLegalEntityFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  deleteLegalEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LegalEntitiesActions.deleteLegalEntity),
      mergeMap(({ id }) =>
        from(this.dbService.deleteByKey('legalEntities', id)).pipe(
          map(() => LegalEntitiesActions.deleteLegalEntitySuccess({ id })),
          catchError((error) =>
            of(
              LegalEntitiesActions.deleteLegalEntityFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
