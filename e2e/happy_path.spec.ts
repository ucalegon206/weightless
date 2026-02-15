import { test, expect } from '@playwright/test';

test.describe('Weightless Core Flow', () => {
    test('initializes engine and handles offline fallback', async ({ page }) => {
        // 1. Load the page
        await page.goto('/');

        // 2. Check title or key elements
        await expect(page).toHaveTitle(/Weightless/);

        // 3. Click Initialize
        const initBtn = page.getByRole('button', { name: 'INITIALIZE INTENT ENGINE' });
        await expect(initBtn).toBeVisible();
        await initBtn.click();

        // 4. Wait for Ready or Offline status
        // Note: In CI environment without GPU, it typically goes to Offline Mode.
        const statusIndicator = page.getByText(/Ready|Offline Mode/);
        await expect(statusIndicator).toBeVisible({ timeout: 10000 });

        // 5. Submit a command
        const input = page.getByPlaceholder('Describe engineering intent...');
        await input.fill('Red Box');
        await input.press('Enter');

        // 6. Verify processing (Command Palette clears or shows processing)
        await expect(input).toBeEmpty();

        // 7. (Optional) Check canvas provided we can access accessibility tree or snapshot logic
        // For now, just ensuring it didn't crash
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();
    });
});
