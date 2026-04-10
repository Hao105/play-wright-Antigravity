import { Page, Locator } from '@playwright/test';
import { CART_URL } from '../constants';

export class CartPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(CART_URL);
  }

  /**
   * 獲取購物車中的產品標題定位器
   */
  productInCart(productName: string): Locator {
    return this.page.getByRole('heading', { name: productName });
  }

  /**
   * 獲取訂單摘要中的總額
   */
  async getOrderTotal(): Promise<string | null> {
    return this.page.locator('div:has-text("Order Summary")').getByText(/^\$/).textContent();
  }
}
