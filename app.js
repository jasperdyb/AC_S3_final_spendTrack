const express = require('express')
const app = express()
const port = 3000

const db = require('./models')

app.get('/', (req, res, next) => {
  res.send('initiated')
})

app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})