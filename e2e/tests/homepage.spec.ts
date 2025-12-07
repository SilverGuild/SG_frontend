import { test, expect as playwrightExpect } from '@playwright/test'

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should display main heading', async ({ page }) => {
        const heading = page.getByRole('heading', { name: /SilverGuild/i })
        await playwrightExpect(heading).toBeVisible()
    })
    
    test('should display the login button when no user is logged in', async ({ page }) => {
        const login = page.getByRole('button', { name: /Login/i})
        await playwrightExpect(login).toBeVisible()
    })
    
    test('should display the sign up button when no user is logged in', async ({ page }) => {
        const signUp = page.getByRole('button', { name: /Sign Up/i })
        await playwrightExpect(signUp).toBeVisible()
    })

    test('should have correct page title', async ({ page }) => {
        await playwrightExpect(page).toHaveTitle(/SilverGuild/i)
    })

    test.skip('should display login modal when login is clicked', async ({ page }) => {
        await page.getByRole('button', { name: /Login/i }).click()

        const modal = page.getByRole('dialog', { name: /Login/i })
        await playwrightExpect(modal).toBeVisible()
    })
    
    test.skip('should display the sign up modal when sign up is clicked', async ({ page }) => {
        await page.getByRole('button', { name: /Sign Up/i }).click()
    
        const modal = page.getByRole('dialog', { name: /Sign Up/i })
        await playwrightExpect(modal).toBeVisible()

    })
})