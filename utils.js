var translit = require('translit-russian');
var isSubset = require('is-subset');
var templates = {
  '/templates/': {}
}

module.exports = {
  template: function(geojson) {
    for(var templateName in templates) {
      var condition = templates[templateName];
      if (isSubset(condition, geojson)) 
        return './templates/' + templateName + '.scs.erb';
    }
  },

  name: function(name) {
    return './results/' + translit(name) + '.scs';
  }
}