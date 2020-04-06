module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    // console.log(req)
    res.redirect('/users/login')
  }
}