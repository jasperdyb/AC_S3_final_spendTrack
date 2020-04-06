$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
})

$('.delete-button').click(function (e) {
  e.stopPropagation()
  const id = $(e.currentTarget).data('restaurant_id')
  $('#deletion').modal()
  $('#deletion-confirm').attr('action', `/record/${id}?_method=DELETE`)
})

$('#category-filter').change(function (e) {
  e.preventDefault()
  this.form.submit()
})

$('#month-filter').change(function (e) {
  e.preventDefault()
  this.form.submit()
})

var totalValue = $('#totalAmount').text()

$({ Counter: 0 }).animate({
  Counter: $('#totalAmount').text()
}, {
  duration: 500,
  easing: 'swing',
  step: function () {
    $('#totalAmount').text(Math.ceil(this.Counter))
  },
  complete: function () {
    $('#totalAmount').text(Math.ceil(totalValue))
  }
})
