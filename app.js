var osmquery = require('query-overpass');
var osmtogeojson = require('osmtogeojson');
var ejs = require('ejs');
var fileSave = require('file-save');
var utils = require('./utils')

var query = "";
osmquery.query_overpass(query, function(error, data) {
  var geojson = osmtogeojson(data);
  ejs.renderFile(utils.template(geojson), {geojson: geojson}, {}, function(error, string) {
    fileSave(utils.name(geojson)).write(string, 'utf8')
  });
});