var osmquery = require('query-overpass');
var osmtogeojson = require('osmtogeojson');
var ejs = require('ejs');
var fileSave = require('file-save');
var utils = require('./utils')

// var query = '[out:json];(node["place"];); out body; >; out skel qt;'
var query = process.argv[2];
osmquery.query_overpass(query, function(error, data) {
  var geojson = osmtogeojson(data);
  utils.identify(geojson)
  ejs.renderFile(utils.template(geojson), {geojson: geojson}, {}, function(error, string) {
    fileSave(utils.name(geojson)).write(string, 'utf8')
  });
});