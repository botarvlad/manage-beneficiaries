import { Beneficiary } from './beneficiary.model';

export interface Individual extends Beneficiary {
  firstName: string;
  lastName: string;
  personalNumber: string; // CNP
  birthDate?: Date;
}
