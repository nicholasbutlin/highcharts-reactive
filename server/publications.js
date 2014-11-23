Meteor.publish('areaData', function(filter, sort) {
  var self = this;
  keys = _.keys(sort.fields);
  var handle = DataPoints.find( filter || {}, sort || {}).observeChanges({
    added: function (id, fields) {
      item = {}
      for (a in keys)
        if (keys[a] != 'date' ){
          data = {};
          values = {};
          values['y'] = fields[keys[a]];
          values['x'] = new Date(fields.date);
          values['id'] = id + 'Pt' + a;
          data[keys[a]] = values;
          _.extend(item, data)
        };
      self.added("areaDataSet", id, item);
    },
    removed: function (id) {
      self.removed("areaDataSet", id);
    }
  });
  self.ready();
  self.onStop(function () {
    handle.stop();
  });
});

Meteor.publish('pieData', function(filter, sort) {
  var self = this;
  keys = _.keys(sort.fields);
  var handle = DataPoints.find( filter || {}, sort || {}).observeChanges({
    added: function (id, fields) {
      item = {}
      for (a in keys)
        if (keys[a] != 'date'){
          data = {};
          data[keys[a]] = fields[keys[a]];
          _.extend(item, data)
        };
        self.added("pieDataSet", id, item);
      },
      removed: function (id) {
        self.removed("pieDataSet", id);
      }
    });
    self.ready();
    self.onStop(function () {
      handle.stop();
    });
  });
