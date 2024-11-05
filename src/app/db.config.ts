import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'BeneficiariesDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'individuals',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'firstName', keypath: 'firstName', options: { unique: false } },
        { name: 'lastName', keypath: 'lastName', options: { unique: false } },
        { name: 'phone', keypath: 'phone', options: { unique: false } },
        { name: 'address', keypath: 'address', options: { unique: false } },
        {
          name: 'personalIdNumber',
          keypath: 'personalIdNumber',
          options: { unique: false },
        },
        {
          name: 'ibanAccounts',
          keypath: 'ibanAccounts',
          options: { unique: false },
        },
      ],
    },
    {
      store: 'legalEntities',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        {
          name: 'companyName',
          keypath: 'companyName',
          options: { unique: false },
        },
        {
          name: 'registrationNumber',
          keypath: 'registrationNumber',
          options: { unique: false },
        },
        { name: 'phone', keypath: 'phone', options: { unique: false } },
        { name: 'address', keypath: 'address', options: { unique: false } },
        {
          name: 'establishmentDate',
          keypath: 'establishmentDate',
          options: { unique: false },
        },
        {
          name: 'ibanAccounts',
          keypath: 'ibanAccounts',
          options: { unique: false },
        },
      ],
    },
  ],
};
