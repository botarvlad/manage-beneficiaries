import { Beneficiary } from './beneficiary.model';

export interface LegalEntity extends Beneficiary {
  name: string;
  registrationNumber: string; // CUI
  establishmentDate?: Date;
}
