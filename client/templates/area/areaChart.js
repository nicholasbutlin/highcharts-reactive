Template.area.rendered = function() {
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

  var chartOptions = {
    chart: {
      type: 'areaspline'
    },
    title: {
      text: 'Generation Mix'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis :{

    },
    plotOptions: {
      areaspline: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2
        }
      },
      series: {
        fillOpacity: 1
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: ' MW'
    }
  };

  //set initial series data
  chartSeries = function(){
    seriesObject = { series : []}
    //for each of the items we requested, create a series
    for (a in keys)
      //don't want the date
      // serColor = '#00FF' + a*10
      if (keys[a] != 'date'){
        item = keys[a]
        seriesObject.series.push({
          name: keys[a],
          data: [],
          color: serColors[keys[a]]
        })
      }
      return seriesObject
    }

    var chartObject = _.extend(chartOptions, chartSeries());

    var chart = $('#area').highcharts(chartObject);

    this.areaHandle = AreaData.find().observe({
      added: function(d){
        var chart = $('#area').highcharts();
        //for each of the items we requested, create a series
        for (a in keys)
          //don't want the date
          if (keys[a] != 'date'){
            point = d[keys[a]];
            chart.series[a-1].addPoint(point);
          }
        },
        removed: function(d){
          var chart = $('#area').highcharts();
          for (a in keys)
            //don't want the date
            if (keys[a] != 'date'){
              pointId = d._id + 'Pt' + a;
              chart.get(pointId).remove();
            }
          }
        });
}

Template.area.destroyed = function(){
  this.areaHandle.stop();
}
