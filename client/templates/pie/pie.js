Template.pie.rendered = function() {
  var keys = _.keys(Session.get('fields'));
  var serColors = {
    'INTEW': '#9999ff',
    'INTNED': '#6666ff',
    'INTIRL': '#3333ff',
    'INTFR': '#0066ff',
    'OCGT': '#cc3300',
    'OIL': '#000000',
    'OTHER': '#99ff66',
    'NPSHYD': '#009966',
    'PS': '#006666',
    'WIND': '#33cc33',
    'CCGT': '#990000',
    'NUCLEAR': '#663300',
    'COAL': '#660000'
  }

  var chartOptions = function(){
    var totalMW = 0;
    if (PieData.find().fetch()[0])
      totalMW = PieData.find().fetch()[0]['totalMW'];
    options = {
      chart: {
      type: 'pie'
      },
      title: {
        text: 'Current Generation Mix ( Total:' + totalMW + ' )'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} MW',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      }
    };
    return options
  };

  //set initial series data
  chartSeries = function(){
    dataSet = PieData.find().fetch()
    if (dataSet[0]){
      seriesObject = {
        series : [{
          name: 'Generation Mix',
          type: 'pie',
          data: []
          }
        ]}
      //for each of the items we requested, create a series
      for (a in keys)
        //don't want the date
        if (keys[a] != 'date' && keys[a] != 'totalMW'){
          seriesObject.series[0].data.push({
            name: keys[a],
            y: dataSet[0][keys[a]],
            color: serColors[keys[a]]
          })
        }
        return seriesObject
      }
    }

  Tracker.autorun(function(){
    var chartObject = _.extend(chartOptions(), chartSeries());
    var chart = $('#pie').highcharts(chartObject);
  })
}
