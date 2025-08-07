import { Page } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Login method - handles the login process
   */
  async login(): Promise<void> {
    // Basic login implementation - may need customization
    await this.page.goto('/login');
    await this.page.fill('[data-testid="username"]', 'testuser');
    await this.page.fill('[data-testid="password"]', 'testpassword');
    await this.page.click('[data-testid="login-button"]');
    await this.page.waitForURL('/account');
  }

  /**
   * Clear cache, cookies, storage and reload the page
   * Enhanced to include localStorage and sessionStorage clearing
   */
  async clearCacheAndReload(): Promise<void> {
    // Clear cookies
    await this.page.context().clearCookies();
    
    // Clear localStorage and sessionStorage
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    
    // Reload the page
    await this.page.reload();
    await this.waitForPageLoad();
  }

  /**
   * Measure page load performance
   */
  async measurePerformance(): Promise<number> {
    const start = Date.now();
    await this.waitForPageLoad();
    return Date.now() - start;
  }

  /**
   * Simulate network error by going offline
   */
  async simulateNetworkError(): Promise<void> {
    await this.page.context().setOffline(true);
  }

  /**
   * Restore network connection
   */
  async restoreNetwork(): Promise<void> {
    await this.page.context().setOffline(false);
  }

  /**
   * Wait for page to fully load
   * Enhanced to wait for both networkidle and domcontentloaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Take a screenshot for debugging purposes
   * Screenshots are saved with timestamp to avoid overwriting
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for a specific API response
   * Useful for ensuring data is loaded before assertions
   * @param urlPattern - String or RegExp pattern to match the API URL
   */
  async waitForAPIResponse(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForResponse(response => 
      response.url().match(urlPattern) !== null && response.status() === 200
    );
  }

  /**
   * Helper method to check if an element exists without throwing
   * @param selector - CSS selector or data-testid
   */
  async elementExists(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for multiple elements to be visible
   * Useful for ensuring a section is fully loaded
   * @param selectors - Array of selectors to wait for
   */
  async waitForElements(selectors: string[]): Promise<void> {
    await Promise.all(
      selectors.map(selector => this.page.waitForSelector(selector))
    );
  }

  /**
   * Get text content with retry logic
   * Handles cases where content might be dynamically loaded
   * @param selector - Element selector
   * @param maxRetries - Maximum number of retries
   */
  async getTextContent(selector: string, maxRetries: number = 3): Promise<string | null> {
    for (let i = 0; i < maxRetries; i++) {
      const element = await this.page.locator(selector);
      const text = await element.textContent();
      
      if (text && text.trim() !== '') {
        return text;
      }
      
      // Wait a bit before retrying
      await this.page.waitForTimeout(500);
    }
    
    return null;
  }

  /**
   * Scroll element into view
   * Ensures element is visible before interaction
   * @param selector - Element selector
   */
  async scrollIntoView(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Check if page has any console errors
   * Useful for catching JavaScript errors during tests
   */
  async checkForConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    return errors;
  }

  /**
   * Scroll to a specific element
   * @param selector - Element selector to scroll to
   */
  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }
}