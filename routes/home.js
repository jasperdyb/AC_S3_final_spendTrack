const express = require('express')
const router = express.Router()
// const Record = require("../models/record.js")
const { authenticated } = require('../config/auth')
const dateFormat = require('../public/js/dateFormat.js')
const monthFormat = require('../public/js/monthFormat.js')

// 載入 model
const db = require('../models')
const Record = db.Record

router.get('/', authenticated, (req, res, next) => {
  let month = 'default'
  let category = 'default'
  let method = { userId: req.user._id }

  //set up query method base on query items
  if (Object.entries(req.query).length) {
    month = req.query.month
    category = req.query.category
    console.log(month, category)

    if (month !== 'default') {
      let m = new Date(month)
      let monthStart = new Date(month)
      let monthEnd = new Date(m.setMonth(m.getMonth() + 1))
      console.log(monthStart, monthEnd)
      method.date = { $gte: monthStart, $lte: monthEnd }
    }

    if (category !== 'default') {
      method.category = category
    }
  }



  Record.find(method)
    .lean()
    .sort({ date: 1 })
    .exec((err, records) => {
      if (err) return console.error(err)

      let totalAmount = 0
      let months = []

      for (var i = 0; i < records.length; i++) {
        //calculate total amount
        totalAmount += records[i].amount
        let date = records[i].date


        //format dates
        let m = monthFormat(date)
        if (!months.includes(m)) {
          months.push(m)
        }


        records[i].date = dateFormat(date)
      }

      if (months.length) {
        months.sort()
      }

      return res.render('index', { records, totalAmount, month, category, months }) // 將資料傳給 index 樣板
    })
})

module.exports = router