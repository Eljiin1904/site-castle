import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http:127.0.0.1:3000/crash');
});

test.describe('Crash Basic Scenarios', () => {
  test.use({storageState: {cookies: [], origins: []}});
  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Crash/);
  });
  test('has crash chart component', async ({ page }) => {
   
    const crashSlider = page.locator('.CrashViewSlider');
    const crashYAxis = page.locator('.CrashYAxis');
    const crashMultiplierLine = page.locator('.CrashMultiplierLine');
    const crashGrid = page.locator('.CrashGrid');
    
    await expect(crashGrid).toBeVisible();
    await expect(crashSlider).toBeVisible();
    await expect(crashYAxis).toBeVisible();
    await expect(crashMultiplierLine).toBeVisible();
  });
  test('has bet board', async ({ page }) => {
    // Should have a component with class BetBoard
    await expect(page.locator('.BetBoard')).toBeVisible();
  });
  test('has bet menu', async ({ page }) => {
    // Should have a auto and manual bet menu
    const crashMenu = page.locator('_react=CrashMenu').first();
    expect(crashMenu).toBeVisible();

    const autoBetMenu = crashMenu.getByText('Auto');
    const manualBetMenu = crashMenu.getByText('Manual');
    await expect(autoBetMenu).toBeVisible();
    await expect(manualBetMenu).toBeVisible();

    //Check manual bet menu is selected by default, Place Bet button should be visible 
    // and Start Auto Play button should not be visible
    // await expect(manualBetMenu).toHaveClass('.bg-brown-8');
    await expect(page.getByText(/Place Bet/)).toBeVisible({timeout: 6000});
    await expect(page.getByText('Start Auto Play')).not.toBeVisible(); 

    //Check auto bet selected when clicked
    await autoBetMenu.click();
    //Check Start Auto Play button is visible and Place Bet button is not visible
    await expect(page.getByText('Start Auto Play')).toBeVisible();
    await expect(page.getByText(/Place Bet/)).not.toBeVisible({timeout: 6000});
  });
});

test.describe('Crash User not logged Scenarios', () => {

  test.use({storageState: {cookies: [], origins: []}});
  test('User not logged', async ({ page }) => {
    // Expect Log In button to be visible
    await expect(page.getByRole('button', { name: 'Log In', exact: true })).toBeVisible();
  });
  test('needs user to be logged for place bet', async ({ page }) => {
    // if Place Bet or Start Auto Play are clicked, it should show a modal with the text "Sign In to Castle"
    await page.getByRole('button', { name: 'Place Bet' }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    
    const crashMenu = page.locator('_react=CrashMenu').first();
    const autoBetMenu = crashMenu.getByText('Auto');
    await autoBetMenu.click();
    await page.getByRole('button', { name: 'Start Auto Play' }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
  });
  test('needs user to logged for enter amount or multiplier', async ({ page }) => {
    // if any of the amount buttons are clicked, it should show a modal with the text "Sign In to Castle"
    // close the modal after each button click
    await page.getByRole('button', { name: '1/2' }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    await page.getByRole('button', { name: '2X', exact: true }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    await page.getByRole('button', { name: 'Max' }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    await page.getByRole('button', { name: '+', exact: true }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    await page.getByRole('button', { name: '-', exact: true }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
  });
  test('Wallet not visible', async ({ page }) => {
    // Expect Wallet button to not be visible
    await expect(page.getByRole('button', { name: 'Wallet', exact: true })).not.toBeVisible();
  });
  test('My bets are not visible', async ({ page }) => {
    //Check that the bets are visible
    await expect(page.getByText('My Bets')).not.toBeVisible();
  });
});

test.describe('Crash User logged Scenarios', () => {

  test('Wallet is visible', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page.getByRole('button', { name: 'Wallet' })).toBeVisible();
  });
  test('User has balance', async ({ page }) => {

    const siteBalanceComp = page.locator('_react=SiteBalance').first();
    expect(siteBalanceComp).toBeVisible();
    const balance = await siteBalanceComp.locator('_react=Span').first().innerHTML();
    expect(parseInt(balance)).toBeGreaterThan(0);
  });
  test('User click amount buttons', async ({ page }) => {
    
    let inputValue = await  page.getByRole('textbox', { name: 'Enter amount...' }).inputValue();
    let currentAmount = parseFloat(inputValue) || 0;

    //Check click 1/2 button
    await page.getByRole('button', { name: '1/2' }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter amount...' }).inputValue();
    let newAmount = parseFloat(inputValue) || 0;
    expect(newAmount).toBe(currentAmount === 0 ? 0.01 : currentAmount / 2);
    currentAmount = newAmount;

    //Check click 2X button
    await page.getByRole('button', { name: '2X', exact: true }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter amount...' }).inputValue();
    newAmount = parseFloat(inputValue) || 0;
    expect(newAmount).toBe(currentAmount === 0 ? 0.01 : currentAmount * 2);
    currentAmount = newAmount;

    //Check click Max button
    const siteBalanceComp = page.locator('_react=SiteBalance').first();
    const balanceText = await siteBalanceComp.locator('_react=Span').first().innerHTML();
    const balanceValue = balanceText.replace(/,/g, '');
    
    await page.getByRole('button', { name: 'Max' }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter amount...' }).inputValue();
    expect(inputValue).toBe(balanceValue);
  });
  test('User click multipliers + and - buttons', async ({ page }) => {
    let inputValue = await  page.getByRole('textbox', { name: 'Enter multiplier...' }).inputValue();
    let currentAmount = parseFloat(inputValue) || 0;
    //Check click + button
    await page.getByRole('button', { name: '+', exact: true }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter multiplier...' }).inputValue();
    let newAmount = parseFloat(inputValue) || 0;
    expect(newAmount).toBe(currentAmount == 0 ? 2: currentAmount + 1);
    currentAmount = newAmount;
    //Check click - button
    await page.getByRole('button', { name: '-', exact: true }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter multiplier...' }).inputValue();
    newAmount = parseFloat(inputValue) || 0;
    expect(newAmount).toBe(currentAmount - 1);
    currentAmount = newAmount;
  });
  test('My bets are visible', async ({ page }) => {
    //Check that the bets are visible
    await expect(page.getByText('My Bets')).toBeVisible();
  });
  test('User click place bet without amount', async ({ page }) => {
    //Check that the modal is shown
    page.getByRole('button', { name: 'Place Bet' }).click();
    await expect(page.getByText('Invalid bet amount.')).toBeVisible();
  });
  test('User click place bet with amount only once', async ({ page }) => {
    //Check that user bet is visible
    const placeButton = page.getByRole('button', { name: 'Place Bet' }).first();
    await expect(page.getByText('Starting in...')).toBeVisible();
    await page.getByRole('button', { name: '2X', exact: true }).click();
    await placeButton.click();
    const betTicket = page.locator('_react=BetBoardTicketCard').filter({hasText: 'You'});
    await expect(betTicket).toBeVisible();
    // Check button is disabled after placing a bet
    await expect(placeButton).toBeDisabled();
  });
  test('User click auto play without multiplier', async ({ page }) => {
    //Check that the modal is shown
    const autoBetMenu = page.locator('_react=CrashMenu').first().getByText('Auto');
    await autoBetMenu.click();
    await page.getByRole('button', { name: 'Start Auto Play' }).click();
    await expect(page.getByText('Invalid multiplier')).toBeVisible();
    //Check that the modal is closed
    await page.locator('svg').first().click();
    await expect(page.getByText('Invalid multiplier')).not.toBeVisible();
  });
  test('User place auto play bet', async ({ page }) => {
    //Check that user bet is visible
    const autoBetMenu = page.locator('_react=CrashMenu').first().getByText('Auto');
    await autoBetMenu.click();
    await page.getByRole('button', { name: '+', exact: true }).click();
    const autoPlayButton = page.getByRole('button', { name: 'Start Auto Play' });
    await expect(autoPlayButton).toBeVisible();
    await autoPlayButton.click();
    const stopAutoPlayButton = page.getByRole('button', { name: 'Stop Auto Play' }); 
    await expect(stopAutoPlayButton).toBeVisible();
    await expect(autoPlayButton).not.toBeVisible();
  });

});

test.describe('Crash Play Scenarios', () => {
  test('Round Status is waiting for bets', async ({ page }) => {
    //Wait for round to be waiting, then wait multiplier time to be completed
    // round time is 39020.384223760426 for a 15x multiplier
   
    //wait until waiting
    await expect(page.getByText('Starting in...')).toBeVisible();
    //Set timeout to wait for the round to start and check multiplier and multiplier line
    await page.waitForTimeout(5000); // wait for 6 seconds
    await expect(page.locator('_react=CrashMultiplier')).toBeVisible();
    // wait for the round to complete
    await page.waitForTimeout(39021); 
    // Check round status is completed
    await expect(page.locator('_react=CrashedSimulator')).toBeVisible();
  });
  test('Crash animation when round Status is completed', async ({ page }) => {
    //Check that the crash animation is visible
    const crashAnimation = page.locator('_react=CrashedSimulator').first();
    await expect(crashAnimation).toBeVisible();
    //Check that the multiplier line is not visible
    await expect(page.getByText('rugged')).toBeVisible();
    await expect(page.locator('_react=CrashEvent[animated]')).toBeVisible();
    await expect(page.locator('.Multiplier')).toHaveText('15.00');
    await expect(page.locator('_react=CrashMultiplierLine[status="completed"]')).toBeVisible();
  });
  test('Round Status is simulating', async ({ page }) => {
    //Check that the multiplier is visible
    await expect(page.locator('_react=CrashMultiplier')).toBeVisible();
    //Check that the multiplier line is visible
    await expect(page.locator('_react=CrashMultiplierLine[status="simulating"]')).toBeVisible();
    const multiplier = await page.locator('.Multiplier').first().innerText();
    expect(parseFloat(multiplier)).toBeGreaterThan(1.00);
    expect(parseFloat(multiplier)).toBeLessThanOrEqual(15.00);
  });
  test('Round Status is waiting', async ({ page }) => {
    //wait until waiting
    await expect(page.getByText('Starting in...')).toBeVisible();
    //Check that the multiplier is not visible
    //await expect(page.locator('_react=CrashMultiplier')).toBeUndefined();
    //Check that the multiplier line is waiting
    await expect(page.locator('_react=CrashMultiplierLine[status="waiting"]')).toBeVisible();
  });

  test('User place bet', async ({ page }) => {
     //wait until waiting
     await expect(page.getByText('Starting in...')).toBeVisible();
    //Check that user bet is visible
    const betTicket = page.locator('_react=BetBoardTicketCard').filter({hasText: 'You'});
    await expect(betTicket).not.toBeVisible();
    // Place a bet
    await page.getByRole('button', { name: '2X', exact: true }).click();
    await page.getByRole('button', { name: 'Place Bet' }).click();
    // Check that the bet is placed and visible in My Bets tab
    await expect(betTicket).toBeVisible();
  });

  test('User cashout and won', async ({ page }) => {
    //wait until waiting
    await expect(page.getByText('Starting in...')).toBeVisible();
    await page.getByRole('button', { name: '2X', exact: true }).click();
    await page.getByRole('button', { name: 'Place Bet' }).click();
    
    //Wait for the round to be active
    await page.waitForTimeout(19021); // wait for 19 seconds

    //Check that the cashout button is visible
    const cashoutButton = page.getByRole('button', { name: 'Take Profit' });
    await expect(cashoutButton).toBeVisible();
    //Click on cashout button
    await cashoutButton.click();
    //Check that the cashout was successful and visible in My Bets tab
    const betTicket = page.locator('_react=BetBoardTicketCard').filter({hasText: 'You'}).first();
    const spanTicket = betTicket.locator('.Span').first();
    
    const ticketMultiplier = await spanTicket.innerText();
    expect(parseFloat(ticketMultiplier)).toBeGreaterThan(1.00);
    expect(parseFloat(ticketMultiplier)).toBeLessThanOrEqual(15.00);
    await expect(spanTicket).toHaveClass('_color-bright-green');
   
    const multiplierLine = page.locator('_react=CrashMultiplierLine[status="crashed"]');
    await expect(multiplierLine).toBeVisible();
    const multiplier = await page.locator('.Multiplier').first().innerText();
    expect(multiplier).toBe(ticketMultiplier);
  });
});
// Crash Game Scenarios, multiplier set to 15 for testing purposes

// Page basic Scenarios
// 1. Page has title -> Done
// 2. Page has Crash chart component -> Done
// 3. Page has bet board -> Done
// 4. Page has bet menu ->  Done

// User not logged Scenarios
// 1. User not logged -> expect login button -> Done
// 1. User place bet -> expect modal to show -> Done
// 2. User enter amount or multiplier -> expect modal to show -> Done
// 4. User not balance -> expect not wallet balance ->  Done
// 5. My Bets tab is not visible -> Done

// User logged Scenarios
// 1. User in -> expect wallet to be visible -> Done
// 2. User has balance -> expect balance to show -> Done
// 3. User click amount buttons -> expect amount to change -> Done
// 4. User click multipliers + and - buttons -> expect multiplier to change -> Done
// 5. My Bets tab is visible -> Done
// 6. User place bet without amount  -> Done
// 7. User placed bet -> Done
// 8. user click auto play -> Done

// Play Scenarios
// 1. Round Status -> expect round status to be "waiting for bets",  "active" and "completed" -> ok
// 2. Round Status completed -> expect crashout animation to be visible -> ok
// 3. Round Status simulating -> expect multiplier to be visible -> ok
// 4. Round Status waiting -> expect multiplier not to be visible
// 2. User place bet -> expect bet to be placed and visible in My Bets tab -> ok
// 3. User cashout and won -> expect cashout to be successful and visible in My Bets tab
// 4. User cashout and won  -> expect  cashout multiplier to be greater than 1
// 5. User cashout and won -> expect profit to be visible
// 6. User cashout and won -> expect multiplier to be green at the end and not cashout animation
// 7. User cashout and lost -> expect multiplier to be red at the end and cashout animation
// 8. User cashout and lost -> expect rugged text
// 9. User cashout and lost -> expect bet to be lost