import { Page, Locator } from '@playwright/test';
import { PRODUCTS_URL } from '../constants';

export class ProductsPage {
  private readonly cartIcon: Locator;

  constructor(private readonly page: Page) {
    // 透過 Header 中帶有數字標籤（購物車數量）的容器來定位
    this.cartIcon = page.locator('div').filter({ has: page.locator('span').filter({ text: /^\d+$/ }) }).first();
  }

  async goto() {
    await this.page.goto(PRODUCTS_URL);
  }

  /**
   * 將特定產品加入購物車
   * @param productName 產品名稱
   */
  async addProductToCart(productName: string) {
    // 定位產品卡片 (a.group)，並點擊內部帶有 shopping 圖示的按鈕
    const productCard = this.page.locator('a.group, .ant-card').filter({ hasText: productName }).first();
    await productCard.waitFor({ state: 'visible' });
    
    const addButton = productCard.locator('button').filter({ has: this.page.locator('[aria-label="shopping"]') });
    await addButton.click();
  }

  /**
   * 開啟側邊購物車清單
   */
  async openCartDrawer() {
    await this.cartIcon.waitFor({ state: 'visible' });
    await this.cartIcon.click();
    // 等待側欄標題 "Your Cart" 出現，確保側欄已展開
    await this.page.getByRole('heading', { name: 'Your Cart' }).waitFor({ state: 'visible' });
  }

  /**
   * 點擊側邊欄中的 View Cart 通往購物車頁面
   */
  async clickViewCart() {
    const viewCartBtn = this.page.getByRole('button', { name: 'View Cart' });
    await viewCartBtn.waitFor({ state: 'visible' });
    await viewCartBtn.click();
  }
}
