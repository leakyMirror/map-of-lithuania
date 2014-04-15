var request = require('request') 
  , async = require('async')
  , fs = require('fs')
  , trueOrder = require('./helpers/ids.js').ids

//-----------------------------------------------
// Declaring functions
//-----------------------------------------------
function findString(item, string) {
  var type = item.type_name.search('Level 5') > -1 ? true : false
    , name = item.name.search('Unknown') > -1 ? false : true
  return type && name ? true : false
}

function requestData(item,callback) {
  var id = item.properties.osmId
    , url = 'http://global.mapit.mysociety.org/area/' + id + '.geojson'
  
  request({ uri: url }, function(err,req,body) {
    item.geometry = JSON.parse(body)
    callback(null, item)
  })
}

//-----------------------------------------------
// Start
//-----------------------------------------------
fs.readFile('helpers/units.json', 'utf-8', function(err,file) {
  // Read file units.json and filter municipalities
  var file = JSON.parse(file)
    , keys = Object.keys(file)
    , array = keys.map(function(d) { return file[d] })
    , municipalities = array.filter(function(d) { return findString(d) })

  // Create GeoJSON object
  var GeoJSON = { 'type': 'FeatureCollection', 'features': [] }
  
  // Add new properties to municipality object
  municipalities.forEach(function(d) {
    var obj = {
      type: 'Feature'
    , properties: {}
    , geometry: {}
    }
    
    obj.properties.longName = d.name
    obj.properties.name = d.name.replace('rajonas', 'r. sav.').replace('savivaldybė', 'sav.').replace('rajono', 'r.').replace('miesto', 'm.')
    obj.properties.id = trueOrder.filter(function(d) { return d['Savivaldybė'] === obj.properties.name })[0].id
    obj.properties.osmId = d.id
    
    GeoJSON.features.push(obj)
  })

  // Get GeoJSON geometry data from MapIt API
  async.map(GeoJSON.features, requestData, function(err,res) {
    fs.writeFile('GeoJSON/LTU_OSMddd.geojson', JSON.stringify(GeoJSON))
  })
})