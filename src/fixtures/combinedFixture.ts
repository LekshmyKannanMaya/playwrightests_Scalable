import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { RegistrationPage } from '../pages/registration.page';
import { MailSlurpService } from '../utils/mailSlurpService';

type PageFixtures = {
  homePage: HomePage;
  registrationPage: RegistrationPage;

};

type MailFixtures = {
    mailService : MailSlurpService;
};

/**
 * The ONE `test` object all specs import. Page objects are injected lazily
 * (only created if a test asks for them) — no `new Page()` boilerplate in specs.
 */
export const test = base.extend<PageFixtures & MailFixtures>({
    homePage: async ({ page }, use) => use(new HomePage(page)),
    registrationPage: async ({ page }, use) => use(new RegistrationPage(page)),
    mailService: async ({}, use) => {
        const apiKey = process.env.MAILSLURP_API_KEY;
        const mailServiceInstance = new MailSlurpService(apiKey!);
        await use(mailServiceInstance);
    },

});
