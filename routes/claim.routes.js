const { Router } = require('express')
const { startParse } = require('../utils/puppeteer')
const getDetails = require('../utils/service.httpGetDetails')
const getCoordinates = require('../utils/service.httpGetCoordinates')
const clearCookies = require('../utils/service.httpClearCookies')

const router = Router()
const URL_PERSONAL= process.env.URL_PERSONAL
const URL_FILTER_DATE1 = process.env.URL_FILTER_DATE1
const URL_FILTER_DATE2 = process.env.URL_FILTER_DATE2
const URL_FILTER_DATE3 = process.env.URL_FILTER_DATE3
const currentDate = new Date().toLocaleDateString().toString()
const URL_FILTERED_DATE = URL_FILTER_DATE1 + currentDate + URL_FILTER_DATE2 + currentDate + URL_FILTER_DATE3

router.get('/', async (req, res) => {
    try {
        const data = await startParse(URL_PERSONAL)
        res.json(data)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/all', async (req, res) => {
    try {
        const data = await startParse(URL_FILTERED_DATE)
        res.json(data)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/coordinates/:id',async (req, res) => {
    try {
        const coordinates = await getCoordinates(req.params.id)
        res.json(coordinates)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/detail/:id',async (req, res) => {
    try {
        const detail = await getDetails(req.params.id)
        res.json(detail)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/clear-cookies',async (req, res) => {
    try {
        const clear_cookies = await clearCookies()
        res.json(clear_cookies)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})



module.exports = router

