const puppeteer = require('puppeteer')
const { promises: fs } = require('fs')
const path = require('path')
require('dotenv').config()
const settings = require('../utils/http.settings')

const BASE_URL = process.env.BASE_URL
const URL_ITEM = process.env.URL_ITEM

async function serviceHttpGetDetails (id) {
        const browser = await puppeteer.launch(settings)
        const page = await browser.newPage()
        try {
            const cookiesString = await fs.readFile(path.resolve(__dirname, '../cookies.json'))
            const setCookies = JSON.parse(cookiesString.toString())
            await page.setCookie(...setCookies)
            await page.goto(BASE_URL + URL_ITEM + id)
            await page.content()
            const detail = await page.evaluate(() => {
              const result =  Array.from(document.querySelectorAll('.j_card_div'))
                return result.map(el => el?.innerText)
            })
            await browser.close()
            return detail
        } catch (e) {
            console.log(e)
            await browser.close()
        }
    }

module.exports = serviceHttpGetDetails
