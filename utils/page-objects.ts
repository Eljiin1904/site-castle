import { Page, Locator } from '@playwright/test';

export class AccountPage {
  readonly accountHeader: Locator;
  readonly navigationMenu: Locator;
  readonly profileSection: Locator;
  readonly balanceDisplay: Locator;
  readonly walletButton: Locator;
  readonly userStatsSection: Locator;
  readonly settingsSection: Locator;

  constructor(private page: Page) {
    this.accountHeader = page.locator('[data-testid="account-header"]');
    this.navigationMenu = page.locator('[data-testid="navigation-menu"]');
    this.profileSection = page.locator('[data-testid="profile-section"]');
    this.balanceDisplay = page.locator('[data-testid="balance-display"]');
    this.walletButton = page.locator('[data-testid="wallet-button"]');
    this.userStatsSection = page.locator('[data-testid="user-stats-section"]');
    this.settingsSection = page.locator('[data-testid="settings-section"]');
  }

  async navigateToSection(section: string): Promise<void> {
    await this.page.click(`[data-testid="nav-${section}"]`);
    await this.page.waitForSelector(`[data-testid="${section}-section"]`);
  }
}

export class ProfileSection {
  readonly page: Page;
  readonly username: Locator;
  readonly email: Locator;
  readonly profileImage: Locator;
  readonly dateJoined: Locator;
  readonly editButton: Locator;
  readonly progressBar: Locator;
  readonly levelIndicator: Locator;
  readonly editProfileImage: () => Promise<void>;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize all profile-specific locators
    this.username = page.locator('[data-testid="profile-username"]');
    this.email = page.locator('[data-testid="profile-email"]');
    this.profileImage = page.locator('[data-testid="profile-image"]');
    this.dateJoined = page.locator('[data-testid="profile-date-joined"]');
    this.editButton = page.locator('[data-testid="profile-edit-button"]');
    this.progressBar = page.locator('[data-testid="profile-progress-bar"]');
    this.levelIndicator = page.locator('[data-testid="profile-level-indicator"]');
    
    // Define the editProfileImage method
    this.editProfileImage = async (): Promise<void> => {
      await this.editButton.click();
      await page.waitForSelector('[data-testid="image-upload-modal"]');
    };
  }

  // Additional helper methods for profile operations
  async getProfileData(): Promise<{
    username: string | null;
    email: string | null;
    dateJoined: string | null;
    level: string | null;
  }> {
    return {
      username: await this.username.textContent(),
      email: await this.email.textContent(),
      dateJoined: await this.dateJoined.textContent(),
      level: await this.levelIndicator.textContent()
    };
  }

  async isProfileComplete(): Promise<boolean> {
    const data = await this.getProfileData();
    return !!(data.username && data.email && data.dateJoined);
  }

  async getProgressPercentage(): Promise<number> {
    const progressWidth = await this.progressBar.evaluate((el: HTMLElement) => {
      const style = window.getComputedStyle(el);
      return parseFloat(style.width);
    });
    
    const containerWidth = await this.progressBar.evaluate((el: HTMLElement) => {
      const parent = el.parentElement;
      if (!parent) return 100;
      const style = window.getComputedStyle(parent);
      return parseFloat(style.width);
    });
    
    return (progressWidth / containerWidth) * 100;
  }
}

export class UserStatsSection {
  readonly monthlyWagered: Locator;
  readonly diceStats: Locator;
  readonly allStatsTable: Locator;
  readonly refreshButton: Locator;

  constructor(private page: Page) {
    this.monthlyWagered = page.locator('[data-testid="monthly-wagered"]');
    this.diceStats = page.locator('[data-testid="dice-stats"]');
    this.allStatsTable = page.locator('[data-testid="all-stats-table"]');
    this.refreshButton = page.locator('[data-testid="refresh-button"]');
  }

  async getGameStats(game: string): Promise<{
    wagered: string | null;
    profit: string | null;
    bets: string | null;
    economy: string | null;
  }> {
    const row = this.allStatsTable.locator(`[data-testid="stats-row-${game}"]`);
    await row.waitFor();
    
    return {
      wagered: await row.locator('[data-testid="wagered"]').textContent(),
      profit: await row.locator('[data-testid="profit"]').textContent(),
      bets: await row.locator('[data-testid="bets"]').textContent(),
      economy: await row.locator('[data-testid="economy"]').textContent()
    };
  }

  async refreshStats(): Promise<void> {
    await this.refreshButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}