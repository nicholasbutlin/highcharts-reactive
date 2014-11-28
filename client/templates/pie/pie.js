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
    options = {
      chart: {
      type: 'pie'
      },
      title: {
        text: 'Current Generation : 0',
        useHTML: true
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        series: {
          animation: {
            duration: 300
          }
        },
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
      },
      series: [{
          name: 'Generation Mix',
          type: 'pie',
          data: [{
            name: 'CCGT',
            y: 0
          }]
      }],
      credits: {
        enabled: false
      }
    };
    return options
  };

  chart = $('#pie').highcharts(chartOptions());

  this.areaHandle = PieData.find().observe({
    added: function(d){
      chart = $('#pie').highcharts();
      chart.setTitle({
        text: 'Current Generation Mix : ' + d.totalMW + ' MW <br>' + '<h6>' + new Date(d.date) + '</h6> <br>'
        });
      //for each of the items we requested, create a series
      delete d.date
      delete d.totalMW
      delete d._id
      b =[]
      keys = _.keys(d)
      for (a in keys)
        b.push({
          'name': keys[a],
          'y' : d[keys[a]]
        })
      chart.series[0].setData(b)
      }
  });
}

Template.pie.destroyed = function(){
  this.areaHandle.stop();
}
