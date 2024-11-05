import { createAction, props } from '@ngrx/store';
import { Individual } from '../../models/individual.model';

export const loadIndividuals = createAction('[Individuals] Load Individuals');
export const loadIndividualsSuccess = createAction(
  '[Individuals] Load Individuals Success',
  props<{ individuals: Individual[] }>()
);
export const loadIndividualsFailure = createAction(
  '[Individuals] Load Individuals Failure',
  props<{ error: string }>()
);

export const loadIndividual = createAction(
  '[Individuals] Load Individual',
  props<{ id: number }>()
);
export const loadIndividualSuccess = createAction(
  '[Individuals] Load Individual Success',
  props<{ individual: Individual }>()
);
export const loadIndividualFailure = createAction(
  '[Individuals] Load Individual Failure',
  props<{ error: string }>()
);

export const addIndividual = createAction(
  '[Individuals] Add Individual',
  props<{ individual: Individual }>()
);

export const updateIndividual = createAction(
  '[Individuals] Update Individual',
  props<{ individual: Individual }>()
);
export const updateIndividualSuccess = createAction(
  '[Individuals] Update Individual Success',
  props<{ individual: Individual }>()
);
export const updateIndividualFailure = createAction(
  '[Individuals] Update Individual Failure',
  props<{ error: string }>()
);

export const deleteIndividual = createAction(
  '[Individuals] Delete Individual',
  props<{ id: number }>()
);
export const deleteIndividualSuccess = createAction(
  '[Individuals] Delete Individual Success',
  props<{ id: number }>()
);
export const deleteIndividualFailure = createAction(
  '[Individuals] Delete Individual Failure',
  props<{ error: string }>()
);
