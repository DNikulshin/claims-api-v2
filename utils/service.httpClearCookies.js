const fs = require('fs')
const path = require('path')
const pathCookie = path.resolve(__dirname, '..', './cookies.json')

async function serviceHttpClearCookies () {

   await fs.truncate(pathCookie, 0, function(){console.log('ClearCookies')})
}

module.exports = serviceHttpClearCookies
