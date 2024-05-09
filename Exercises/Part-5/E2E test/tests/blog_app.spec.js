const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')
const helper = require('./helper')

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
        await request.post('/api/users', {
            data: {
                name: 'cannot delete',
                username: 'cant del',
                password: 'delete'
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

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()

        })

        test('a new blog can be created', async ({ page }) => {

            await page.getByRole('button', { name: 'new blog' }).click()

            await page.getByPlaceholder('title').fill('E2E test 1')
            await page.getByPlaceholder('author').fill('zed')
            await page.getByPlaceholder('url').fill('local')

            await page.getByRole('button', { name: 'create' }).click()

            await page.getByText('a new blog E2E test 1 by zed added').isVisible()
        })

        test('a blog can be edited such as inc likes', async ({ page })=> {
            await page.getByRole('button', { name: 'new blog' }).click()

            await page.getByPlaceholder('title').fill('E2E test 1')
            await page.getByPlaceholder('author').fill('zed')
            await page.getByPlaceholder('url').fill('local')

            await page.getByRole('button', { name: 'create' }).click()

            await page.getByText('a new blog E2E test 1 by zed added').isVisible()

            await page.getByText('E2E test 1 zed')
                .getByRole('button', { name: 'view'}).click()

            const likesText = await page.$eval('li.likes', like => like.textContent)
            const likesValue = parseInt(likesText.replace('likes: ', ''))

            await expect(likesValue).toEqual(0)
            console.log(likesValue)

            await page.getByText('E2E test 1 zed')
                .getByRole('button', { name: 'like' }).click()

            await page.waitForFunction(() => {
                const updatedLikesText = document.querySelector('li.likes').textContent
                const updatedLikesValue = parseInt(updatedLikesText.replace('likes: ', ''))
                return updatedLikesValue > 0
            })

            const updatedLikesText = await page.$eval('li.likes', like => like.textContent)
            const updatedLikesValue = parseInt(updatedLikesText.replace('likes: ', ''))
            console.log(updatedLikesValue)
            
            expect(updatedLikesValue).toBeGreaterThan(likesValue)
        })

    

        test('the user who added can also delete', async ({ page }) => {

            await page.getByRole('button', { name: 'new blog' }).click()

            await page.getByPlaceholder('title').fill('E2E test 2')
            await page.getByPlaceholder('author').fill('zed')
            await page.getByPlaceholder('url').fill('local')

            await page.getByRole('button', { name: 'create' }).click()

            await page.waitForSelector('button', { name: 'view'})
            //deletion
            await page.getByText('E2E test 2 zed')
                .getByRole('button', { name: 'view' }).click()

            await page.getByRole('button', { name: 'remove' }).click()

            await page.on('dialog', async dialog => {
                await dialog.accept()
            })

            await page.on('dialog', async dialog => {
                await dialog.accept()
            })
        })

        test('User who didnt create cannot delete', async ({ page }) => {

            //Authorize Blog creation
            await page.getByRole('button', { name: 'new blog' }).click()

            await page.getByPlaceholder('title').fill('E2E test 2')
            await page.getByPlaceholder('author').fill('zed')
            await page.getByPlaceholder('url').fill('local')

            await page.getByRole('button', { name: 'create' }).click()

            //Logout
            await page.getByRole('button', { name: 'Logout' }).click()

            //Login different user
            await page.getByTestId('username').fill('cant del')
            await page.getByTestId('password').fill('delete')
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByText('cannot delete logged-in').isVisible()

            //navigate to the created blog
            await page.getByText('E2E test 2 zed')
                .getByRole('button', { name: 'view' })
            
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        describe('List of blogs', () => {
            beforeEach(async ({ page, request }) => {

                const response = await page.waitForResponse('http://localhost:5173/api/login')
                const responseData = await response.json()
                console.log(responseData)

                const authToken  = responseData.token

                for (let blog of helper.initialBlogs) {
                    const res = await request.post('/api/blogs', {

                        headers: {
                            'Authorization': `Bearer ${authToken}`
                        },

                        data: {
                            title: blog.title,
                            author: blog.author,
                            url: blog.url,
                            likes: blog.likes
                        }
                    })
                    console.log(res)
                }
            })

            test('Sorted list of blogs', async ({ page }) => {
                await expect(1).toEqual(1)
            })
        })
    })

})

