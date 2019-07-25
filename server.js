require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const app = express()
const PORT = 5000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to DB'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

const apiRouter = require('./routes/apiRoutes')
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
