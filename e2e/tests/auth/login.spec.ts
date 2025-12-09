import { test, expect as playwrightExpect } from '@playwright/test'

test.describe('Login', () => { 
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })
    
    test.skip('should return to the homepage after a user logs in', async ({ page }) => {

    })

    test.skip('should display username and welcome message when a user is logged in ', async ({ page }) => {

    })
})
