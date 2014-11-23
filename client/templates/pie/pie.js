// Template.area.rendered = function() {
//   var keys = _.keys(Session.get('fields'));
//   var serColors = {
//     'INTEW': '#9999ff',
//     'INTNED': '#6666ff',
//     'INTIRL': '#3333ff',
//     'INTFR': '#0066ff',
//     'OCGT': '#cc3300',
//     'OIL': '#000000',
//     'OTHER': '#99ff66',
//     'NPSHYD': '#009966',
//     'PS': '#006666',
//     'WIND': '#33cc33',
//     'CCGT': '#990000',
//     'NUCLEAR': '#663300',
//     'COAL': '#660000'
//   }
//
//   var chartOptions = {
//     chart: {
//       type: 'pie'
//     },
//     title: {
//       text: 'Generation Mix'
//     },
//     tooltip: {
//       valueSuffix: ' MW'
//     }
//   };
//
//   //set initial series data
//   chartSeries = function(dataSet){
//     seriesObject = { series : []}
//     //for each of the items we requested, create a series
//     for (a in keys)
//       //don't want the date
//       // serColor = '#00FF' + a*10
//       if (keys[a] != 'date'){
//         item = keys[a]
//
//         seriesObject.series.push({
//           name: keys[a],
//           data: dataSet[item],
//           color: serColors[keys[a]]
//         })
//       }
//       return seriesObject
//     }
//
//   Tracker.autorun(function(){
//     dataSet = PieData.find().fetch()
//     var chartObject = _.extend(chartOptions, chartSeries(dataSet));
//     var chart = $('#pie').highcharts(chartObject);
//   })
// }
