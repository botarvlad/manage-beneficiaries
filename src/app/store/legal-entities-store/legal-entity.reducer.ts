import { createReducer, on } from '@ngrx/store';
import * as LegalEntitiesActions from './legal-entity.actions';
import { LegalEntity } from '../../models/legal-entity.model';

export interface LegalEntryState {
  legalEntities: LegalEntity[];
  loading: boolean;
  error: string | null;
}

const initialState: LegalEntryState = {
  legalEntities: [],
  loading: false,
  error: null,
};

export const legalEntitiesReducer = createReducer(
  initialState,
  on(LegalEntitiesActions.loadLegalEntities, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    LegalEntitiesActions.loadLegalEntitiesSuccess,
    (state, { legalEntities }) => ({
      ...state,
      legalEntities: [...legalEntities],
      loading: false,
      error: null,
    })
  ),
  on(LegalEntitiesActions.loadLegalEntitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(LegalEntitiesActions.loadLegalEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LegalEntitiesActions.loadLegalEntitySuccess, (state, { legalEntry }) => ({
    ...state,
    legalEntities: [legalEntry],
    loading: false,
    error: null,
  })),
  on(LegalEntitiesActions.loadLegalEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(LegalEntitiesActions.addLegalEntity, (state, { legalEntity }) => ({
    ...state,
    legalEntities: [...state.legalEntities, legalEntity],
  })),
  on(LegalEntitiesActions.updateLegalEntity, (state, { legalEntity }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    LegalEntitiesActions.updateLegalEntitySuccess,
    (state, { legalEntity }) => ({
      ...state,
      legalEntities: state.legalEntities.map((existingLegalEntity) =>
        existingLegalEntity.id === legalEntity.id
          ? legalEntity
          : existingLegalEntity
      ),
      error: null,
    })
  ),
  on(LegalEntitiesActions.updateLegalEntityFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(LegalEntitiesActions.deleteLegalEntity, (state, { id }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LegalEntitiesActions.deleteLegalEntitySuccess, (state, { id }) => ({
    ...state,
    legalEntities: state.legalEntities.filter(
      (legalEntity) => legalEntity.id !== id
    ),
    loading: false,
    error: null,
  })),
  on(LegalEntitiesActions.deleteLegalEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
