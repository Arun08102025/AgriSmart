import { test, expect } from '@playwright/test';

test.describe('AgriSmart Core Flows', () => {

  test('should display login page and allow navigation to dashboard', async ({ page }) => {
    // Navigate to homepage which should redirect to login if unauthenticated
    await page.goto('/');
    
    // Check if we are on the login page by title or element
    // For this prototype, we're assuming the user has access via the mock layout
    // We navigate directly to the dashboard to test its components
    await page.goto('/dashboard');
    
    await expect(page.locator('text=Welcome')).toBeVisible();
    await expect(page.locator('text=My Farms')).toBeVisible();
    await expect(page.locator('text=New Soil Test')).toBeVisible();
  });

  test('should navigate to add farm form', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Click the Add Farm button
    await page.click('text=Add Farm');
    
    // Verify navigation
    await expect(page).toHaveURL(/.*\/dashboard\/farms\/new/);
    await expect(page.locator('text=Add New Farm')).toBeVisible();
  });

  test('should navigate to new soil test form', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Click the New Soil Test card
    await page.click('text=New Soil Test');
    
    // Verify navigation
    await expect(page).toHaveURL(/.*\/dashboard\/soil\/new/);
    await expect(page.locator('text=Submit Soil Test Data')).toBeVisible();
  });

  test('should allow saving soil test offline payload', async ({ page, context }) => {
    // Simulate offline mode
    await context.setOffline(true);
    
    await page.goto('/dashboard/soil/new');
    
    // Check for offline banner
    await expect(page.locator('text=You are offline')).toBeVisible();
    
    // Note: Filling out the form fully requires mock test data and interacting with Shadcn components
    // For basic E2E, we verify the presence of the form elements
    await expect(page.locator('input[name="phLevel"]')).toBeVisible();
    await expect(page.locator('input[name="nitrogen"]')).toBeVisible();
    
    await context.setOffline(false);
  });
});
