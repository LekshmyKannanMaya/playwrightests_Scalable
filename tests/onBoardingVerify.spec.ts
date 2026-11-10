import { test } from '../src/fixtures/combinedFixture';
import { buildApplicant } from '../src/data/factories/applicant.factory';
import { authentication } from '../src/config/env';
import { expect } from '@playwright/test';

test.describe('Onboarding flow - Registration & Login', () => {
    test('user first time onboarding flow ', async ({ page ,homePage,registrationPage,mailService }) => {
        const applicant = buildApplicant();
        const { inboxId, emailAddress, startTime } = await mailService.createTestEmail();
        const iban = "DE96245301118709587174";
        await homePage.goto();
       homePage.registerUserWithCaptcha(emailAddress);
        //The execution is paused, so that a human can interact with the captcha .
        // Hence we deliberately do **not** bypass or try to solve CAPTCHAs programmatically. 
        // Click "Resume" in the Inspector (or press F8) once verification is completed.
        await page.pause();
        homePage.registerContinue()
        await expect(page).toHaveURL(/onboarding\/email-confirmation/);

        const verificationLink = await mailService.getVerificationLink(inboxId, startTime);
        await page.goto(verificationLink);

        await expect(page).toHaveURL(/.*onboarding\/email-verified/);
        await registrationPage.setUpCredentials(authentication.PASSWORD)

        await expect(page).toHaveURL(/.*onboarding\/broker/);
        await registrationPage.startNowBroker();

        await expect(page).toHaveURL(/.*personal-data\/personal-information/);
        await registrationPage.personalDetails(applicant.personalDetails);

        await expect(page).toHaveURL(/.*personal-data\/contact-details/);
        await registrationPage.contactDetails(applicant.contactAddress);

        await expect(page).toHaveURL(/.*personal-data\/financial-profile/);
        await registrationPage.financialDetails();

        await expect(page).toHaveURL(/.*personal-data\/tax-details/);
        await registrationPage.taxDetails();

        await expect(page).toHaveURL(/.*bank-details/);
        await registrationPage.bankDetails(iban);

        await expect(page).toHaveURL(/.*review-personal-data/);
        await registrationPage.reviewVerifyDetails(applicant.personalDetails);
        
        await expect(page).toHaveURL(/.*terms-and-conditions/);
        await registrationPage.termsAndConditions();
        
        await expect(page).toHaveURL(/.*auth\/mfa-enforcement/);
    });

    test('user onboarding flow -Login using customer details', async ({ page ,homePage }) => {
        const loginUser="4b507f27-9c45-45d4-a039-c3ed95e0eb47@sandbox.zazamail.link"
        await homePage.goto();
        await homePage.login(loginUser,authentication.PASSWORD);
    });
});