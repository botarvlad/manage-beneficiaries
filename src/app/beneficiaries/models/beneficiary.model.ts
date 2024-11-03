export class Beneficiary {
  constructor(
    public id: number,
    public phone: string,
    public address: string,
    public ibans: string[],
    public type: 'individual' | 'company'
  ) {}
}

export class Individual extends Beneficiary {
  constructor(
    id: number,
    phone: string,
    address: string,
    ibans: string[],
    public firstName: string,
    public lastName: string,
    public birthDate: Date,
    public cnp: string
  ) {
    super(id, phone, address, ibans, 'individual');
  }
}

export class Company extends Beneficiary {
  constructor(
    id: number,
    phone: string,
    address: string,
    ibans: string[],
    public name: string,
    public cui: string,
    public establishmentDate: Date
  ) {
    super(id, phone, address, ibans, 'company');
  }
}
