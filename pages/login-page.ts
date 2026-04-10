import { Page, Locator } from '@playwright/test';
import { LOGIN_URL } from '../constants';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    // 使用 getByPlaceholder 優化定位器
    this.emailInput = page.getByPlaceholder('Your email address');
    this.passwordInput = page.getByPlaceholder('Your password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async goto() {
    await this.page.goto(LOGIN_URL);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
