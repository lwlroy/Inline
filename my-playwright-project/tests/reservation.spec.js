const { test, expect } = require('@playwright/test');

test.describe('Booking Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });


    test.describe('User can go to correct booking page', () => {
        test('should load the booking page', async ({ page }) => {
            const heading = page.locator('role=heading[name="Henry\'s Cafe 善導寺店"]');
            await expect(heading).toContainText('Henry\'s Cafe 善導寺店');
        });
    });

    test.describe('User can switch language', () => {
        test('switch language', async ({ page }) => {
            await page.getByText('EN', { exact: true }).click();
            await page.getByText('繁體中文').click();
            await expect(page).toHaveURL(/.*language=zh-tw/);
            await page.getByText('繁中', { exact: true }).click();
            await page.getByText('English').click();
            await expect(page).toHaveURL(/.*language=en/);
        });
    });

    test.describe('User can go to google map module by click view map button', () => {
        test('click view map button', async ({ page }) => {
            await page.getByText('View Map').click();
            await page.waitForTimeout(1000);
            const element = page.frameLocator('#booking-google-embed-map').locator('.gm-style > div > div:nth-child(2)').first();
            const isVisible = await element.isVisible();
            expect(isVisible).toBe(true);
        });
    });

    test.describe('User can select different party size', () => {
        test('select adults', async ({ page }) => {
            //check default adults option is 2 
            await expect(page.locator('#adult-picker')).toContainText('2 Adults');
            //select adults to other options
            await page.locator('#adult-picker').selectOption('1 Adults');
            await expect(page.locator('#adult-picker')).toContainText('1 Adults');
            await page.locator('#adult-picker').selectOption('2 Adults');
            await expect(page.locator('#adult-picker')).toContainText('2 Adults');
            await page.locator('#adult-picker').selectOption('3 Adults');
            await expect(page.locator('#adult-picker')).toContainText('3 Adults');
            await page.locator('#adult-picker').selectOption('4 Adults');
            await expect(page.locator('#adult-picker')).toContainText('4 Adults');
            await page.locator('#adult-picker').selectOption('5 Adults');
            await expect(page.locator('#adult-picker')).toContainText('5 Adults');
            await page.locator('#adult-picker').selectOption('6 Adults');
            await expect(page.locator('#adult-picker')).toContainText('6 Adults');
            await page.locator('#adult-picker').selectOption('7 Adults');
            await expect(page.locator('#adult-picker')).toContainText('7 Adults');
            await page.locator('#adult-picker').selectOption('8 Adults');
            await expect(page.locator('#adult-picker')).toContainText('8 Adults');
        });
        test('select kids', async ({ page }) => {
            //check default kids option is 0 
            await expect(page.locator('#kid-picker')).toContainText('0 Kids');
            //select Kids to other options
            await page.locator('#kid-picker').selectOption('1 Kids');
            await expect(page.locator('#kid-picker')).toContainText('1 Kids');
            await page.locator('#kid-picker').selectOption('2 Kids');
            await expect(page.locator('#kid-picker')).toContainText('2 Kids');
            await page.locator('#kid-picker').selectOption('3 Kids');
            await expect(page.locator('#kid-picker')).toContainText('3 Kids');
            await page.locator('#kid-picker').selectOption('4 Kids');
            await expect(page.locator('#kid-picker')).toContainText('4 Kids');
            await page.locator('#kid-picker').selectOption('5 Kids');
            await expect(page.locator('#kid-picker')).toContainText('5 Kids');
            await page.locator('#kid-picker').selectOption('6 Kids');
            await expect(page.locator('#kid-picker')).toContainText('6 Kids');
            //change adults to 1
            await page.locator('#adult-picker').selectOption('1 Adults');
            await expect(page.locator('#adult-picker')).toContainText('1 Adults');
            //check kids can be 7
            await page.locator('#kid-picker').selectOption('7 Kids');
            await expect(page.locator('#kid-picker')).toContainText('7 Kids');
        });
    });
});