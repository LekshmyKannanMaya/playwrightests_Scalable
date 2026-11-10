import { faker } from '@faker-js/faker/locale/de';
import type { Applicant, ContactAddress, PersonalDetails } from '../type';
import { formatDate } from '../../utils/helper';

const buildPersonalDetails = (
  overrides: Partial<PersonalDetails> = {},
): PersonalDetails => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age', refDate: '01.01.2001' }),
  placeOfBirth: faker.location.city(),
  countryOfBirth: 'Indien',
  citizenship: 'Indien',
  ...overrides,
});

const buildContactAddress = (
  overrides: Partial<ContactAddress> = {},
): ContactAddress => ({
  street: faker.location.street(),
  houseNumber: String(faker.number.int({ min: 1, max: 150 })),
  postalCode: faker.location.zipCode('#####'),
  city: faker.location.city(),
  phoneNumber: '+49170' + faker.string.numeric(7),
  ...overrides,
});

export const buildApplicant = (
  overrides: { personal?: Partial<PersonalDetails>; address?: Partial<ContactAddress> } = {},
): Applicant => ({
  personalDetails: buildPersonalDetails(overrides.personal),
  contactAddress: buildContactAddress(overrides.address),
});