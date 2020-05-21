require('dotenv').config()
require('./server/db-conn')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./client/azure-app/build'))
app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: __dirname + './client/azure-app/build'})
})
app.use('/api/thoughts', require('./server/routes/thoughts-route'))
const {PORT} = process.env;
app.listen(PORT, () => console.log(`Wizard happening at PORT NUMBRT ${PORT}`))