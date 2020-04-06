let data = {}
$('.record').each(function (index, obj) {
  date = $(this).find('.record_date').text()
  if (data[date]) {
    data[date] += parseInt($(this).find('.record_amount').text())
  } else {
    data[date] = parseInt($(this).find('.record_amount').text())
  }
});
console.log(data)

let dataEntries = Object.entries(data)
console.log(dataEntries)


google.charts.load('current', { 'packages': ['corechart'] })

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  var label = [['month', 'amount']]
  console.log(label.concat(dataEntries))
  // Create the data table.
  var plot_data = google.visualization.arrayToDataTable(label.concat(dataEntries));

  var view = new google.visualization.DataView(plot_data);


  // Set chart options
  var options = {
    'width': 1000,
    'height': 300,
    legend: { position: 'none' },
    bar: { groupWidth: "50%" }
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(view, options);
}
