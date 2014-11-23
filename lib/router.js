Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  onBeforeAction: function(){
    $('html, body').animate({scrollTop: 0 }, 350); //pretty fade between routes
    $('#main').hide().fadeIn(250);
    this.next();
  }
});

Router.route('home', {
  name: 'home',
  path: '/'
});
Router.route('area', {
  path: '/area',
  onBeforeAction: function(){
    Session.set('filter', {})
    Session.set('fields', {
      'date': 1,
      'INTEW': 1,
      'INTNED': 1,
      'INTIRL': 1,
      'INTFR': 1,
      'OCGT': 1,
      'OIL': 1,
      'OTHER': 1,
      'NPSHYD': 1,
      'PS': 1,
      'WIND': 1,
      'COAL': 1,
      'CCGT': 1,
      'NUCLEAR': 1
    })
    Session.set('limit', 5);
    this.next();
  },
  waitOn: function () {
    Tracker.autorun(function () {
      limit = Session.get('limit');
      fields = Session.get('fields')
      Meteor.subscribe('areaData', Session.get('filter'), { sort: {date: -1}, limit: 12, fields: fields });
    });
  },
  action: function () {
    // this.ready() is true if all items returned from waitOn are ready
    var areaHandle
    if (this.ready())
      this.render();
      else
        this.render('Loading');
      }
});
Router.route('pie', {
  path: '/pie',
  onBeforeAction: function(){
    Session.set('filter', {})
    Session.set('fields', {
      'date': 1,
      'INTEW': 1,
      'INTNED': 1,
      'INTIRL': 1,
      'INTFR': 1,
      'OCGT': 1,
      'OIL': 1,
      'OTHER': 1,
      'NPSHYD': 1,
      'PS': 1,
      'WIND': 1,
      'COAL': 1,
      'CCGT': 1,
      'NUCLEAR': 1
    })
    this.next();
  },
  waitOn: function () {
    Tracker.autorun(function () {
      fields = Session.get('fields')
      Meteor.subscribe('pieData', Session.get('filter'), { sort: {date: -1}, limit: 1, fields: fields });
    });
  }
});
