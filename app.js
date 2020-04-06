const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport)
const { authenticated } = require('./config/auth')
const flash = require('connect-flash')

// Session設定
app.use(session({
  secret: 'the special key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true
}))

//middleware
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()

  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  //passport authenticate failed 時傳送的錯誤訊息
  let errorMessage = req.flash('error')[0]
  // console.log(errorMessage)

  //將passport預設訊息轉譯
  switch (errorMessage) {
    case 'That email is not registered':
      res.locals.passport_error_msg = '信箱未註冊'
      break
    case 'Missing credentials':
      res.locals.passport_error_msg = '請填寫信箱及密碼'
      break
    case 'Email or Password incorrect':
      res.locals.passport_error_msg = '錯誤的信箱或密碼'
  }

  next()
})


//routes
app.use('/', require('./routes/home.js'))
app.use('/record', authenticated, require('./routes/record.js'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auth.js'))//facebook authentication

app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})