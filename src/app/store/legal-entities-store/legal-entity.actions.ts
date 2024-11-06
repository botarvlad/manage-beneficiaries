import { createAction, props } from '@ngrx/store';
import { LegalEntity } from '../../models/legal-entity.model';
import { LegalEntityDTO } from '../../models/dtos/legal-entity-dto.model';

export const loadLegalEntities = createAction(
  '[Legal Entities] Load Legal Entities'
);
export const loadLegalEntitiesSuccess = createAction(
  '[Legal Entities] Load Legal Entities Success',
  props<{ legalEntities: LegalEntity[] }>()
);
export const loadLegalEntitiesFailure = createAction(
  '[Legal Entities] Load Legal Entities Failure',
  props<{ error: string }>()
);

export const loadLegalEntity = createAction(
  '[Legal Entities] Load Legal Entity',
  props<{ id: number }>()
);
export const loadLegalEntitySuccess = createAction(
  '[Legal Entities] Load Legal Entity Success',
  props<{ legalEntry: LegalEntity }>()
);
export const loadLegalEntityFailure = createAction(
  '[Legal Entities] Load Legal Entity Failure',
  props<{ error: string }>()
);

export const addLegalEntity = createAction(
  '[Legal Entities] Add Legal Entity',
  props<{ legalEntity: LegalEntityDTO }>()
);
export const addLegalEntitySuccess = createAction(
  '[Legal Entities] Add Legal Entity Success',
  props<{ legalEntity: LegalEntity }>()
);
export const addLegalEntityFailure = createAction(
  '[Legal Entities] Add Legal Entity Failure',
  props<{ error: string }>()
);

export const updateLegalEntity = createAction(
  '[Legal Entities] Update Legal Entity',
  props<{ legalEntity: LegalEntity }>()
);
export const updateLegalEntitySuccess = createAction(
  '[Legal Entities] Update Legal Entity Success',
  props<{ legalEntity: LegalEntity }>()
);
export const updateLegalEntityFailure = createAction(
  '[Legal Entities] Update Legal Entity Failure',
  props<{ error: string }>()
);

export const deleteLegalEntity = createAction(
  '[Legal Entities] Delete Legal Entity',
  props<{ id: number }>()
);
export const deleteLegalEntitySuccess = createAction(
  '[Legal Entities] Delete Legal Entity Success',
  props<{ id: number }>()
);
export const deleteLegalEntityFailure = createAction(
  '[Legal Entities] Delete Legal Entity Failure',
  props<{ error: string }>()
);
