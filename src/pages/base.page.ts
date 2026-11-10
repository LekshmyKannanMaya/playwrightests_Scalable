import { Page, expect, test } from '@playwright/test';
import { escapeRegExp } from '../utils/helper';
/**
 * Base class every page object extends.
 */
export abstract class BasePage {
  /** Relative path of the page (used by goto & isLoaded). */
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}


async goto(): Promise<void> {
    await test.step(`Open ${this.path}`, async () => {
      await this.page.goto(this.path);
    });
  }
  
}