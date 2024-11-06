import { BeneficiaryDTO } from './beneficiary-dto.model';

export interface LegalEntityDTO extends BeneficiaryDTO {
  name: string;
  registrationNumber: string; // CUI
  establishmentDate?: Date;
}
