const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByText('Log in to application').isVisible()

        await page.getByRole('textbox').getByTestId('username').isVisible()
        await page.getByRole('textbox').getByTestId('password').isVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Matti Luukkainen logged-in')).not.toBeVisible()
        })
    })

    
})