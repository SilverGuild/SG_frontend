// e2e/tests/profile/profile-navigation.spec.ts
import { test, expect as playwrightExpect } from '@playwright/test'
import { isRightOf } from '../../helper/positioning'

test.describe('User Profile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Login as test user
    await page.goto('/profile')
    await page.waitForLoadState('networkidle')
  })

  test.skip('profile displays user information in top right corner of profile', async ({ page }) => {
    const result = await isRightOf(
      page.locator('[data-testid="profile-details"]'),
      page.locator('[data-testid="character-roster"]')
    )

    playwrightExpect(result).toBe(true)
  })

  test.skip('user can edit their profile', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Click edit profile button
    // TODO: Verify edit form appears
    // TODO: Fill in profile fields
    // TODO: Click save button
    // TODO: Verify success message
    // TODO: Verify changes are reflected
  })

  test.skip('user can cancel editing profile', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Click edit profile button
    // TODO: Make changes to fields
    // TODO: Click cancel button
    // TODO: Verify original data is still displayed
    // TODO: Verify changes were not saved
  })

  test.skip('user can scroll through character roster pages', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Scroll to character roster section
    // TODO: Click next page button
    // TODO: Verify new characters are displayed
    // TODO: Click previous page button
    // TODO: Verify original characters are displayed
  })

  test.skip('clicking on a character navigates away from profile', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Click on a character card
    // TODO: Verify URL changed to character detail page
    // TODO: Verify no longer on profile page
  })

  test.skip('clicking create new character navigates away from profile', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Click create new character button
    // TODO: Verify URL changed to character creation page
    // TODO: Verify character creation form is visible
  })

  test.skip('profile displays user avatar', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Verify that user's avatar is visible
    await playwrightExpect(page.locator('[data-testid="profile-avatar"]')).toBeVisible()
  })

  test.skip('profile displays user name', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Verify that user's name is visible
  })

  test.skip('profile displays user email', async ({ page }) => {
  })


  test.skip('empty character roster shows placeholder message and button', async ({ page }) => {
    // TODO: Login as user with no characters
    // TODO: Navigate to profile
    // TODO: Verify "no characters" message is displayed
    // TODO: Verify create character CTA is shown
  })

  test.skip('character roster displays correct number of characters', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Count character cards displayed
    // TODO: Verify count matches expected number
    // TODO: Verify pagination shows correct total
  })

  test.skip('user can navigate back to profile from header while on another page', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Navigate to another page (e.g., dashboard)
    // TODO: Click profile link in header again
    // TODO: Verify back on profile page
  })

  test.skip('edit profile button is disabled while saving', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Click edit profile button
    // TODO: Fill in fields
    // TODO: Click save
    // TODO: Verify save button shows loading state
    // TODO: Verify save button is disabled during save
  })

  test.skip('profile shows loading state while fetching data', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Verify loading spinner or skeleton is shown initially
    // TODO: Verify content appears after loading
  })

  test.skip('profile handles missing optional fields gracefully', async ({ page }) => {
    // TODO: Login as user with minimal profile data
    // TODO: Navigate to profile
    // TODO: Verify page loads without errors
    // TODO: Verify optional fields show appropriate defaults/placeholders
  })

  test.skip('user can refresh profile page without losing state', async ({ page }) => {
    // TODO: Navigate to profile
    // TODO: Scroll to specific position
    // TODO: Refresh page
    // TODO: Verify still on profile page
    // TODO: Verify data is still displayed
  })
})
