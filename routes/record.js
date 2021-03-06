const express = require('express')
const router = express.Router()
// const Record = require('../models/record.js')
const dateFormat = require('../public/js/dateFormat.js')

// 載入 model
const db = require('../models')
const Record = db.Record
const User = db.User

router.get('/new', (req, res, next) => {
  res.render('new')
})

router.post('/new', (req, res, next) => {
  req.body.UserId = req.user.id

  // TODO add input verification
  Record.create(req.body)
    .then(
      (record) => { return res.redirect('/') }
    )
    .catch((error) => { return res.status(422).json(error) })

})

router.get('/:id/edit', (req, res, next) => {
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then((record) => {
      record.date = dateFormat(record.date)

      return res.render('edit', { record })
    })
    .catch((error) => { return res.status(422).json(error) })
})

router.put('/:id', (req, res, next) => {

  // TODO add input verification

  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then((record) => {
      for (var key in req.body) {
        record[key] = req.body[key]
      }
      return record.save()
    })
    .then((record) => {
      return res.redirect('/')
    })
    .catch((error) => { return res.status(422).json(error) })
})

router.delete('/:id', (req, res, next) => {

  User.findByPk(req.user.id)
    .then((user) => {
      console.log(req.user.id)
      if (!user) throw new Error("user not found")

      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((record) => {
      return res.redirect('/')
    })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
