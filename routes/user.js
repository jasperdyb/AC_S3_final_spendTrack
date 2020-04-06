const express = require('express')
const router = express.Router()
// const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 載入 model
const db = require('../models')
const User = db.User

// 登入頁面
router.get('/login', (req, res) => {
  const login = true
  res.render('login', { login })
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { // 使用 passport 認證
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/users/login', // 失敗會留在登入頁面
    failureFlash: true
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  login = false
  res.render('register', { login })
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  // 加入錯誤訊息提示
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    // TODO fix query
    User.findOne({ email: email }).then(user => {
      if (user) {                                       // 檢查 email 是否存在
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', {
          errors,               // 使用者已經註冊過
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({    // 如果 email 不存在就直接新增
          name,
          email,
          password
        })

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash

            newUser
              .save()
              .then(user => {
                console.log('user added!')
                res.redirect('/')                         // 新增完成導回首頁
              })
              .catch(err => console.log(err))

          })


        )
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已經成功登出')
  res.redirect('/')
})

module.exports = router