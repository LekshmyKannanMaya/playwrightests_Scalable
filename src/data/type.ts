export interface ContactAddress {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dob: Date;
  placeOfBirth: string;
  countryOfBirth: string;
  citizenship: string;
}

export interface Applicant {
  personalDetails: PersonalDetails;
  contactAddress: ContactAddress;
}