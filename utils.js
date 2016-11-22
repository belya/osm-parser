var translit = require('translit-russian');
var isSubset = require('is-subset');
var templates = {
  'city': {}
}

module.exports = {
  identify: function(geojson) {
    geojson.identifier = translit(geojson.name)
  },

  template: function(geojson) {
    for(var templateName in templates) {
      var condition = templates[templateName];
      if (isSubset(condition, geojson)) 
        return './templates/' + templateName + '.scs.erb';
    }
  },

  name: function(geojson) {
    return './results/' + geojson.identifier + '.scs';
  }
}