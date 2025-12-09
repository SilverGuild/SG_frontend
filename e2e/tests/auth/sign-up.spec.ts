import { test, expect as playwrightExpect } from '@playwright/test'

test.describe('Homepage', () => { 
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test.skip('should return to the homepage after a user signs up', async ({ page }) => {

    })
})
