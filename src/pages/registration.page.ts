import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import type { ContactAddress, PersonalDetails } from '../data/type';
import { formatDate } from '../utils/helper';

export class RegistrationPage extends BasePage {
  protected readonly path = '/';

  private readonly submitButton: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly starNowButton: Locator;
  private readonly gender: Locator;
  private readonly salutation: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly maritalStatus: Locator;
  private readonly maritalCheckbox: Locator;
  private readonly dateOfBirth: Locator;
  private readonly placeOfBirth: Locator;
  private readonly countryOfBirth: Locator;
  private readonly citizenship: Locator;
  private readonly street: Locator;
  private readonly houseNumber: Locator;
  private readonly postalCode: Locator;
  private readonly City: Locator;
  private readonly phoneNumber: Locator;
  private readonly occupationCombo: Locator;
  private readonly unemployed: Locator;
  private readonly accountPurpose: Locator;
  private readonly savings: Locator;
  private readonly occupation: Locator;
  private readonly iban: Locator;
  private readonly doiLabel: Locator;
  private readonly termsConditions: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('button:has([data-testid="icon-arrow-right"])');
    this.password = page.locator('#password')
    this.loginButton = page.locator('button[name="action"][value="default"]')
    this.starNowButton = this.page.locator('button[class*="AuroraProceedButton-root"]');
    this.gender = page.locator('#mui-component-select-personalDetails\\.gender');
    this.salutation = this.page.getByRole('option', { name: /^(Mrs\.|Frau)$/, exact: true })
    this.firstName = page.locator('input[name="personalDetails.firstName"]');
    this.lastName = page.locator('input[name="personalDetails.lastName"]');
    this.maritalStatus = page.locator('input[name="personalDetails.maritalStatus"]').locator('xpath=..').getByRole('combobox');
    this.maritalCheckbox = page.getByRole('option', { name: /^(Yes|Ja)$/, exact: true });
    this.dateOfBirth =page.locator('input[name="personalDetails.dateOfBirth"]');
    this.placeOfBirth =page.locator('input[name="personalDetails.placeOfBirth"]');
    this.countryOfBirth = page.locator('input[name="personalDetails.countryOfBirth"]');
    this.citizenship = page.locator('input[name="personalDetails.citizenships[0]"]');
    this.street = page.locator('input[name="address.street"]');
    this.houseNumber = page.locator('input[name="address.houseNumber"]');
    this.postalCode = page.locator('input[name="address.postalCode"]');
    this.City = page.locator('input[name="address.city"]');
    this.phoneNumber = page.locator('input[name="personalDetails.phoneNumber"]');
    this.occupationCombo = page.locator('.MuiFormControl-root').getByRole('combobox').first();
    this.unemployed = page.getByRole('option').and(this.page.locator(`[data-value="EMPLOYEE"]`));
    this.accountPurpose = page.getByText('Zweck des Kontos'); //this is not a good selector, must be replaced with valid one
    this.savings = page.getByRole('option').and(this.page.locator(`[data-value="DAY_TRADING"]`))
    this.occupation = page.getByRole('combobox', { name: 'Occupation' });
    this.iban = page.locator('#iban');
    this.doiLabel = page.locator('button[aria-describedby="doi-label"]');
    this.termsConditions = page.locator('button[class*="AuroraProceedButton-root"]');
    
  }

  getEmploymentStatusText(statusText: string): Locator {
    return this.page.getByText(statusText, { exact: true });
  }

  async setUpCredentials(value: string): Promise<void> {
    await this.submitButton.click();
    await this.password.fill(value);
    await this.loginButton.click();
  }

  async startNowBroker(): Promise<void> {
    await this.starNowButton.click();
  }

  async personalDetails(p: PersonalDetails): Promise<void> {
    await this.gender.click();
    await this.salutation.click();
    await this.firstName.fill(p.firstName);
    await this.lastName.fill(p.lastName);
    await this.maritalStatus.click();
    await this.maritalCheckbox.click();
    await this.dateOfBirth.fill(formatDate(p.dob));
    await this.placeOfBirth.fill(p.placeOfBirth);
    await this.countryOfBirth.fill(p.countryOfBirth);
    await this.placeOfBirth.click()
    await this.citizenship.fill(p.citizenship);
    await this.submitButton.click();
  }

  async contactDetails(c: ContactAddress): Promise<void> {
    await this.street.fill(c.street);
    await this.houseNumber.fill(c.houseNumber);
    await this.postalCode.fill('80999');
    await this.City.fill(c.city);
    await this.phoneNumber.fill(c.phoneNumber);
    await this.submitButton.click();
  }

  async financialDetails(): Promise<void> {
    await this.occupationCombo.click({ force: true }); // the element click didnt work without forcing. Need investigation
    await this.unemployed.click({ force: true });// the element click didnt work without forcing. Need investigation
    await this.page.keyboard.press('Escape');
    await this.submitButton.click(); //the click is un necessary. Need the locator for account purpose to be changed and the step cna be removed
    await expect(this.accountPurpose).toBeVisible()
    await this.accountPurpose.click({ force: true });// locator needs revisit hence hoping the antipattern can be removed
    await this.savings.click({ force: true }); // the element click didnt work without forcing. Need investigation
    await this.page.keyboard.press('Escape');
    await this.submitButton.click();
    
  }

  async taxDetails(): Promise<void> {
    await this.submitButton.click();
  }

  async bankDetails(value: string): Promise<void> {
    await this.iban.fill(value);
    await this.submitButton.click();
  }
   
  async reviewVerifyDetails(p: PersonalDetails): Promise<void> {
    await expect(this.getEmploymentStatusText(p.citizenship)).toBeVisible();
    await this.doiLabel.click();
  }

  async termsAndConditions(): Promise<void> {
    await this.termsConditions.click();
  }
}
