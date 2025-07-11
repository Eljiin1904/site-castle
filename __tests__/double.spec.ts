import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http:127.0.0.1:3000/double');
});

test.describe('Double Basic Scenarios', () => {
  
  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Double/);
  });

  test('has double slider components', async ({ page }) => {
    // Should have a heading with the name of Double Slider.
   // await expect(page.getByText('Double Slider')).toBeVisible();
    //Should have last 100 plays
    await expect(page.getByText('Last 100')).toBeVisible({ timeout: 10000 });
    //Should have jackpot
    await expect(page.getByText('Jackpot')).toBeVisible();
  });

  test('has bet board', async ({ page }) => {
    // Should have a heading with the name of Double Game Bets.
    await expect(page.getByText('Double Game Bets')).toBeVisible({ timeout: 10000 });
  });

  test('has to have max 100 plays', async ({ page }) => {
    // Should have a heading with the name of Last 100 Plays.
    await expect(page.getByText('Last 100')).toBeVisible();

    const totalGreen = await page.locator('span:right-of(.DoubleIcon.green)').first().innerHTML();
    const totalRed = await page.locator('span:right-of(.DoubleIcon.red)').first().innerHTML();
    const totalBlack = await page.locator('span:right-of(.DoubleIcon.black)').first().innerHTML();

    expect(parseInt(totalGreen) + parseInt(totalRed) + parseInt(totalBlack)).toBeLessThanOrEqual(100); 
  });

  test('needs user to be logged for place bet', async ({ page }) => {
    // if Place bet button is clicked, it should show a modal with the text "Sign In to Castle"
    await page.click('text=Place Bet');
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
  });

  test('needs user to logged for enter amount', async ({ page }) => {
    // if any of the amount buttons are clicked, it should show a modal with the text "Sign In to Castle"
    // close the modal after each button click
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    await page.getByRole('button', { name: '+1', exact: true }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    await page.getByRole('button', { name: '+10', exact: true }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    await page.getByRole('button', { name: '+100' }).click();
    await expect(page.getByText('Sign In to Castle')).toBeVisible();
    await page.locator('svg').first().click();
    await expect(page.getByText('Sign In to Castle')).not.toBeVisible();
    await page.getByRole('button', { name: '/2' }).click();
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
  });

});

test.describe('Double Play Scenarios', () => {

  /**
   * Test to review color win scenario. When play ends, we are going to check that winning color is the last roll color, 
   * last 100 plays winning color increase by 1.
   * last 100 is less  or equal than 100
   * total double icon is more than 6 and less than 15 ( 5 for last 100 and 10 for recent rolls)
   * place bet winning color amount is green
   */
  test.skip('color win', async ({ page }) => {
   
    //Set a timeout of 45 seconds, enough to finish the play
    test.setTimeout(45000);

    //wait for the play to end, retrive winning color and bait and check the numbers
    await expect(async () => {
      
      const color = await page.locator('data-testid=game-completed-color').first().innerHTML();
      //retrieve bait here

      //wait 2 seconds to allow ui to update
      //await page.waitForTimeout(2000);

      //Numbers after play ends
      const totalGreenAfterPlay = await page.locator('span:right-of(.DoubleIcon.green)').first().innerHTML();
      const totalRedNoBaitAfterPlay = await page.locator('span:right-of(.DoubleIcon.red)').first().innerHTML();
      const totalBlackNoBaitAfterPlay = await page.locator('span:right-of(.DoubleIcon.black)').first().innerHTML();
      const totalRedBaitAfterPlay = await page.locator('span:right-of(.DoubleIcon.red.bait)').first().innerHTML();
      const totalBlackBaitAfterPlay = await page.locator('span:right-of(.DoubleIcon.black.bait)').first().innerHTML();
      
      
      //Check that the total of DoubleIcon is bigger than 6 and less or equal than 15
      const last100AndRecentRolls = await page.locator('.DoubleIcon');
      const total = await last100AndRecentRolls.count();
      await expect(total).toBeLessThanOrEqual(15);
      await expect(total).toBeGreaterThanOrEqual(6);
      
     
      //check that the last roll is the winning color
      const lastRoll = await page.locator('_react=DoubleIcon').nth(6);
      let colorExp = new RegExp(`/(^|\s)${color}(\s|$)/`);
      await expect(lastRoll).toHaveClass(colorExp);
     // expect(lastRoll).toContain(color);await page.locator('div:nth-child(4) > div > div:nth-child(2) > div > div').first().click();
    }).toPass({
      timeout: 30000
    });
  
  });
});

test.describe('Double User logged Scenarios', () => {

  // User logged Scenarios
  // 1. User in -> expect wallet to show -> done
  // 2. User has balance -> expect balance to show -> done
  // 3. User click amount buttons -> expect amount to increase -> done
  // 4. User click place bet without amount -> expect toast to show -> done
  // 5. User click place bet with amount -> expect placed bet to show
  // 3. User placed bet 2x and click the other 2x -> expect only one 2x bet to be placed -> done
  // 4. User placed bet -> expect user name in placed bets
  // 4. user win -> expect balance to increase by bet amount * multiplier
  // 5. user lose -> expect balance to decrease by bet amountt * multiplier
  test('Wallet is visible', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page.getByRole('button', { name: 'Wallet' })).toBeVisible();
  });
  test('User has balance', async ({ page }) => {

    const siteBalanceComp = await page.locator('_react=SiteBalance').first();
    await expect(siteBalanceComp).toBeVisible();
    const balance = await siteBalanceComp.locator('_react=Span').first().innerHTML();
    await expect(parseInt(balance)).toBeGreaterThan(0);
  });
  test.skip('User click amount buttons', async ({ page }) => {
    
    let inputValue = await  page.getByRole('textbox', { name: 'Enter bet amount...' }).inputValue();
    let currentAmount = parseFloat(inputValue) || 0;
   
    //Check click +1 button
    await page.getByRole('button', { name: '+1', exact: true }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter bet amount...' }).inputValue();  
    let newAmount = parseFloat(inputValue) || 0;  
    expect(newAmount).toBe(currentAmount + 1);
    currentAmount = newAmount;

    //Check click +10 button
    await page.getByRole('button', { name: '+10', exact: true }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter bet amount...' }).inputValue();
    newAmount = parseFloat(inputValue) || 0;
    expect(newAmount).toBe(currentAmount + 10);
    currentAmount = newAmount;

    //Check click +100 button
    await page.getByRole('button', { name: '+100' }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter bet amount...' }).inputValue();
    newAmount = parseFloat(inputValue) || 0;
    expect(newAmount).toBe(currentAmount + 100);
    currentAmount = newAmount;

    //Check click 1/2 button
    await page.getByRole('button', { name: '1/2' }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter bet amount...' }).inputValue();
    newAmount = parseFloat(inputValue) || 0;
    expect(newAmount).toBe(currentAmount / 2);
    currentAmount = newAmount;

    //Check click 2X button
    await page.getByRole('button', { name: '2X', exact: true }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter bet amount...' }).inputValue();
    newAmount = parseFloat(inputValue) || 0;
    expect(newAmount).toBe(currentAmount * 2);
    currentAmount = newAmount;

    //Check click Max button
    const siteBalanceComp = await page.locator('_react=SiteBalance').first();
    const balanceText = await siteBalanceComp.locator('_react=Span').first().innerHTML();
    const balanceValue = balanceText.replace(/,/g, '');
    
    await page.getByRole('button', { name: 'Max' }).click();
    inputValue = await  page.getByRole('textbox', { name: 'Enter bet amount...' }).inputValue();
    expect(inputValue).toBe(balanceValue);
  });
  test.skip('User click place bet without amount', async ({ page }) => {
    //Check that the modal is shown
    await page.getByRole('button', { name: 'Place Bet' }).first().click();
    await expect(page.getByText('Invalid bet amount.')).toBeVisible();
  });
  test('User click place bet with amount', async ({ page }) => {
    //Check that user bet is visible
    await expect(page.getByText('josue1.00')).not.toBeVisible();
    await page.getByRole('button', { name: '+1', exact: true }).click();
    await page.getByRole('button', { name: 'Place Bet' }).first().click();
    await expect(page.getByText('josue1.00')).toBeVisible();
  });
  test('User click both place bet 2x', async ({ page }) => {
    test.setTimeout(45000);
    //Check that only one 2x bet is placed
    await page.getByRole('button', { name: '+1', exact: true }).click();
    const button1 = await page.getByRole('button', { name: 'Place Bet'}).first();
    const button2 = await page.getByRole('button', { name: 'Place Bet'}).nth(2);
    await button1.click();
    await button2.click();
    
    //Expect error Toast to be visible
    await expect(page.getByText('Invalid bet combination.')).toBeVisible();    
    //Expect username bet to be visible and only one
    const usernameBet = await page.locator('_react=BetBoardTicketCard').filter({hasText: 'josue'}).count();
    expect(usernameBet).toBe(1);
  });
  test.skip('User placed bet Once', async ({ page }) => {
    test.setTimeout(45000);
    //Add amount to bet
    await page.getByRole('button', { name: '+1', exact: true }).click();
  
    //Place bet in 2x, check that only one bet is placed
    await page.getByRole('button', { name: 'Place Bet' }).first().click();
    await page.waitForTimeout(100);
    let usernameBet = await page.locator('_react=BetBoardTicketCard').filter({hasText: 'josue'}).count();
    expect(usernameBet).toBe(1);
    
  });
  test.skip('User placed bet Twice', async ({ page }) => {
    test.setTimeout(45000);
    //Check that user bet is bets
    //Add amount to bet
    await page.getByRole('button', { name: '+1', exact: true }).click();
  
    //Place bet in 2x, check that only one bet is placed
    await page.getByRole('button', { name: 'Place Bet' }).first().click();
    await page.getByRole('button', { name: 'Place Bet' }).nth(1).click();
    await page.waitForTimeout(100);
    let usernameBet = await page.locator('_react=BetBoardTicketCard').filter({hasText: 'josue'}).count();
    expect(usernameBet).toBe(2);    
  });
  test.only('User placed bet Three times', async ({ page }) => {
    test.setTimeout(45000);
    //Check that user bet is bets
    //Add amount to bet
    await page.getByRole('button', { name: '+1', exact: true }).click();
  
    //Place bet in 2x, check that only one bet is placed
    await page.getByRole('button', { name: 'Place Bet' }).first().click();
    await page.getByRole('button', { name: 'Place Bet' }).nth(1).click();
    await page.getByRole('button', { name: 'Place Bet' }).nth(3).click();
    await page.waitForTimeout(100);
    let usernameBet = await page.locator('_react=BetBoardTicketCard').filter({hasText: 'josue'}).count();
    expect(usernameBet).toBe(3);    
  });
});

// Page basic Scenarios
// 1. Page has title -> Done
// 2. Page has double slider components -> Done
// 3. Page has bet board -> Done
// 4. Page has to have max 100 plays -> Done

// Play Scenarios
// 1. color win -> expect placed bet amount to be green
// 2. color lose -> expect placed bet amount to be red
// 3. color win -> expect last recent play to match color
// 4. color win -> expect last 100 plays to increase color by 1
// 5. bait win -> expect last 100 bait to increase by 1 

// User not logged Scenarios
// 1. User not logged -> expect login button -
// 1. User place bet -> expect modal to show -> Done
// 2. User enter amount -> expect modal to show -> Done
// 3. User in placed bets -> 
// 4. User not balance -> expect not wallet balance -> 

// User logged Scenarios
// 1. User in -> expect user name to show
// 2. User has balance -> expect balance to show
// 3. User placed bet 2x and click the other 2x -> expect only one 2x bet to be placed
// 4. User placed bet -> expect user name in placed bets
// 4. user win -> expect balance to increase by bet amount * multiplier
// 5. user lose -> expect balance to decrease by bet amountt * multiplier