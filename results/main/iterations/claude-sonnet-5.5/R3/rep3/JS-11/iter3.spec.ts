import { test, expect } from '../../../../../support/fixtures';
test('JS-11 Зміна кількості товарів на сторінці', async ({ page }) => {
  // Preconditions
  // The welcome dialog and cookie banner are already dismissed; the user is not logged in.

  // Step 1
  await page.goto('/');
  await expect(page.getByText('All Products')).toBeVisible();

  // Step 2
  // A snackbar overlaps the left part of the select, so click its right edge (the arrow area).
  const pageSize = page.getByRole('combobox', { name: 'Items per page:' });
  await expect(pageSize).toBeVisible();
  const box = await pageSize.boundingBox();
  expect(box).not.toBeNull();
  await pageSize.click({ position: { x: box!.width - 6, y: box!.height / 2 } });
  await page.getByRole('option', { name: '30', exact: true }).click();

  // Expected 1
  await expect(page.getByText('1 – 30 of 46')).toBeVisible();

  // Expected 2
  await expect(page.locator('mat-card')).toHaveCount(30);
});
