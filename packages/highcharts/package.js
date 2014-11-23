Package.describe({
    name: 'nickos:highcharts',
    summary: "Meteor highcharts",
    version: "0.1.0",
    // git: "https://github.com/MaazAli/Meteor-HighCharts.git"
});

Package.onUse(function (api) {

    api.versionsFrom('METEOR@0.9.1.1');
    api.use('jquery');
    api.use('templating');

    // basic highcharts
    api.addFiles('lib/highcharts.js', 'client');
    // extra types
    api.addFiles('lib/highcharts-more.js', 'client');
});
