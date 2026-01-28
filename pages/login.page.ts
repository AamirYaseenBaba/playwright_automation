// pages/login.page.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
private readonly userNameField: Locator;
private readonly passwordField: Locator;
private readonly submitButton: Locator;
private readonly  url: string = '/login';


 constructor(public readonly page: Page) {
    super(page);
    this.userNameField = this.page.getByRole('textbox', { name: 'username' });
    this.passwordField = this.page.getByRole('textbox', { name: 'password' });
    this.submitButton = this.page.getByRole('button', { name: 'Login' });
  }
  async goto() {
    await super.goto(this.url);
  }
  async login(username: string, password: string) {
    await this.userNameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }
}