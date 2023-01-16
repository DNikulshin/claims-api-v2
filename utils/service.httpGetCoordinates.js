const puppeteer = require('puppeteer')
const { promises: fs } = require('fs')
const path = require('path')
require('dotenv').config()
const settings = require('../utils/http.settings')

const BASE_URL = process.env.BASE_URL
const URL_ITEM = process.env.URL_ITEM

async function serviceHttpCoordinates (id) {
        const browser = await puppeteer.launch(settings)
        const page = await browser.newPage()
        try {
            const cookiesString = await fs.readFile(path.resolve(__dirname, '../cookies.json'))
            const setCookies = JSON.parse(cookiesString.toString())
            await page.setCookie(...setCookies)
            await page.goto(BASE_URL + URL_ITEM + id)
            await page.click("[href*='?core_section=address_building&action=show']")
            await page.content()
            await page.waitForSelector('table')
            const dataItems = await page.evaluate(() => {
                return document.querySelector("[href*='?core_section=map&action=show&opt_wh']")?.innerText
            })
            await browser.close()
            return dataItems
        } catch (e) {
            console.log(e)
            await browser.close()
        }
    }

module.exports = serviceHttpCoordinates
