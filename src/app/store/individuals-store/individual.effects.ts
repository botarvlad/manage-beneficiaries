import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { mergeMap, from, map, tap, of, catchError } from 'rxjs';
import { Individual } from '../../models/individual.model';
import * as IndividualsActions from './individual.actions';

@Injectable()
export class IndividualsEffects {
  constructor(
    private actions$: Actions,
    private dbService: NgxIndexedDBService
  ) {}

  loadIndividuals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualsActions.loadIndividuals),
      mergeMap(() =>
        from(this.dbService.getAll<Individual>('individuals')).pipe(
          map((individuals) =>
            IndividualsActions.loadIndividualsSuccess({ individuals })
          ),
          catchError((error) =>
            of(
              IndividualsActions.loadIndividualsFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  loadIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualsActions.loadIndividual),
      mergeMap((action) =>
        from(
          this.dbService.getByKey<Individual>('individuals', action.id)
        ).pipe(
          map((individual) =>
            IndividualsActions.loadIndividualSuccess({ individual })
          ),
          catchError((error) =>
            of(
              IndividualsActions.loadIndividualFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  addIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualsActions.addIndividual),
      mergeMap(({ individual }) =>
        from(this.dbService.add('individuals', individual)).pipe(
          map((individual) =>
            IndividualsActions.addIndividualSuccess({ individual: individual })
          ),
          catchError((error) =>
            of(
              IndividualsActions.addIndividualFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  updateIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualsActions.updateIndividual),
      mergeMap(({ individual }) =>
        from(this.dbService.update('individuals', individual)).pipe(
          map((updatedIndividual) =>
            IndividualsActions.updateIndividualSuccess({
              individual: updatedIndividual,
            })
          ),
          catchError((error) =>
            of(
              IndividualsActions.updateIndividualFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  deleteIndividual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IndividualsActions.deleteIndividual),
      mergeMap(({ id }) =>
        from(this.dbService.deleteByKey('individuals', id)).pipe(
          map(() => IndividualsActions.deleteIndividualSuccess({ id })),
          catchError((error) =>
            of(
              IndividualsActions.updateIndividualFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
