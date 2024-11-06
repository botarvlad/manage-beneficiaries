import { BeneficiaryDTO } from './beneficiary-dto.model';

export interface IndividualDTO extends BeneficiaryDTO {
  firstName: string;
  lastName: string;
  personalNumber: string; // CNP
  birthDate?: Date;
}
