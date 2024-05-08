const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByText('Log in to application').isVisible()

        await page.getByRole('textbox').getByTestId('username').isVisible()
        await page.getByRole('textbox').getByTestId('password').isVisible()
    })
})