import { test, expect as playwrightExpect } from '@playwright/test'

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should display logo', async ({ page }) => {
        await playwrightExpect(page.getByRole('link', { name: /sg_logo/i})).toBeVisible()
    })

    test('should navigate to the profile page', async ({ page }) => {
        await page.getByRole('link', { name: /Profile/i }).click()

        await page.waitForURL('/profile')

        await page.waitForLoadState('networkidle')
        
        await playwrightExpect(page).toHaveURL('/profile') 
        await playwrightExpect(page.getByRole('heading', { name: /Profile/i })).toBeVisible()
    })

    test.skip('should navigate to the about page', async ({ page }) => {
        await page.getByRole('link', { name: /About/i }).click()

        await playwrightExpect(page).toHaveURL('/about') 
        await playwrightExpect(page.getByRole('heading', { name: /About SG/i })).toBeVisible()
    })

    test.skip('should navigate to the create character page', async ({ page }) => {
        await page.getByRole('link', { name: /character/i }).click()

        await playwrightExpect(page).toHaveURL('/character') 
        await playwrightExpect(page.getByRole('heading', { name: /Character Creator/i })).toBeVisible()
    })

    test('should navigate back to the homepage using app logo', async ({ page }) => {
        await page.getByRole('link', { name: /Profile/i }).click()
        await playwrightExpect(page).toHaveURL('/profile')
        
        await page.getByRole('link', {name: /sg_logo/i}).click()
        await playwrightExpect(page).toHaveURL('/')
        await playwrightExpect(page.getByRole('heading', { name: /SilverGuild/i })).toBeVisible()
    })
})
