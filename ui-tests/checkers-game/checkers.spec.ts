import { test, type Page } from '@playwright/test';
import { restartCheckers, makeFiveLegalOrangeMoves, checkSiteIsUp, confirmReset } from "../../helpers";

test.beforeEach(async ({ page }: {page: Page}) => {
  await page.goto('https://www.gamesforthebrain.com/game/checkers/');
});


test('Checkers Game UI Test', async ({page}) => {
    
    const expectedTitle = 'Checkers - Games for the Brain';
    
    await checkSiteIsUp(page, expectedTitle);
   
    await makeFiveLegalOrangeMoves(page);

    await page.waitForTimeout(5000);
    // Restart the game
    await restartCheckers(page);
    await confirmReset(page);
});

