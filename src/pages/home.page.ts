import { Locator, Page, expect , test} from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  protected readonly path = '/';

  private readonly cookies: Locator;
  private readonly email: Locator;
  private readonly firstOnboardingButton: Locator;
  private readonly finalOnboardingButton: Locator;
  private readonly mainTab: Locator;
  private readonly loginLink = 'a[href*="secure-login"]';

  constructor(page: Page) {
    super(page);
    this.cookies = page.locator('[data-testid="uc-accept-all-button"]');
    this.email = page.getByRole('textbox').and(this.page.locator('[type="email"]'));
    this.firstOnboardingButton = page.locator('[data-gtm-id="first-onboarding-click"]');
    this.finalOnboardingButton = page.locator('[data-gtm-id="final-onboarding-click"]');
    this.mainTab = page.getByLabel('Main Navigation');
  }
  
 private getUsername(tab: Page): Locator {
    return tab.locator('#username');
  }

  private getPassword(tab: Page): Locator {
    return tab.locator('#password');
  }

  private submitButton(tab: Page): Locator {
    return tab.locator('button[name="action"][value="default"]');
  }
  
  async registerUserWithCaptcha(username: string): Promise<void> {
    await test.step(`Register as ${username}`, async () => {
        await this.cookies.click();
        await expect(this.mainTab).toBeVisible();
        await this.firstOnboardingButton.click();
        await this.email.click();
        await this.email.fill(username);
        console.log('--- PAUSED FOR MANUAL CAPTCHA ---');
    });
  }
  
  async registerContinue(): Promise<void> {
    await test.step(`continuing registration after manual captcha verification`, async () => { 
        await expect(this.finalOnboardingButton).toBeEnabled({ timeout: 15000 }); 
        await this.finalOnboardingButton.click();
         });
  }
  
  async login(username: string,password: string): Promise<void> {
    await this.cookies.click();
    const [newTabInstance] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator(this.loginLink).click(),
    ]);  
    await newTabInstance.waitForLoadState();
    await this.getUsername(newTabInstance).fill(username);
    await this.getPassword(newTabInstance).fill(password);
    await this.submitButton(newTabInstance).click();    
    await expect(newTabInstance).toHaveURL(/.*auth\/mfa-enforcement/)
 }
}
