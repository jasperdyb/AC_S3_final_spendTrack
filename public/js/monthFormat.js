module.exports = date => {
  var mm = date.getMonth() + 1; // getMonth() is zero-based

  return `${date.getFullYear()}/${(mm > 9 ? '' : '0') + mm}`
}