import { test, type Page } from '@playwright/test';
import { checkSiteIsUp } from "../../helpers";

test.beforeEach(async ({ page }: {page: Page}) => {
  await page.goto('https://deckofcardsapi.com/');
});


test('CARD Game API Test', async ({page}) => {
    
  const expectedTitle = 'Deck of Cards API';
  
  await checkSiteIsUp(page, expectedTitle);
 
});