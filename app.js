const express = require('express')
const fs = require('fs')
// const http = require('http')
const https = require('https')
const cors = require('cors')
const config = require('config')
const path = require('path')

const key = fs.readFileSync(path.resolve(__dirname, 'certs','private.key'))
const cert = fs.readFileSync(path.resolve(__dirname, 'certs','certificate.crt'))
const ca = fs.readFileSync(path.resolve(__dirname, 'certs','ca_bundle.crt'))

const options = {
    key: key,
    cert: cert,
    ca: ca
}

const app = express()

app.use(cors())

app.use('/api/claim', require('./routes/claim.routes'))

const PORT_HTTP = config.get('port_http') || 5555
const PORT_HTTPS = config.get('port_https') || 5556
const HOST = config.get('host') || 'localhost'

if(process.env.NODE_ENV === 'production') {

    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('/.well-known/pki-validation/948E427FC1154A1D517751137485189E.txt', function (req, res, next) {
        res.sendFile(path.resolve(__dirname, 'static', '.well-known', 'pki-validation','948E427FC1154A1D517751137485189E.txt'))
    })
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}


// const httpServer = http.createServer(app)
const httpsServer  = https.createServer(options, app)

async function start() {
    try {
        // httpServer.listen(PORT_HTTP, HOST ,() => console.log(`App has been started host: http://${HOST}:${PORT_HTTP}`))
        httpsServer.listen(PORT_HTTPS, HOST ,() => console.log(`App has been started host: https://${HOST}:${PORT_HTTPS}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
