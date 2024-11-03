import { Company, Individual } from './models/beneficiary.model';

export const beneficiariesMock = [
  new Individual(
    1,
    '072939494943',
    'adresa 1',
    ['RO123981313', '0123819123'],
    'Alex',
    'Popescu',
    new Date('2022-03-25'),
    '1234567889'
  ),
  new Company(
    1,
    '072939494943',
    'adresa 1',
    ['RO123981313', '0123819123'],
    'Company 1',
    'JO12313123123',
    new Date('2022-03-25')
  ),
];
