# Municipalities of Lithuania

This project creates a map of Lithuania divided into 60 municipalities. The output is in GeoJSON and TopoJSON formats.

####[Preview it here](https://github.com/leakyMirror/map-of-lithuania/blob/master/GeoJSON/LTU_Final.geojson)

## Dependencies
To reproduce all process, you would need ```Node.js```, ```npm``` and ```make```. Not sure if it works on Windows.

## How to use
Run ```make``` in Terminal.

## Description
1. Initial data is taken from [MapIt global API](http://global.mapit.mysociety.org/area/363370/covers) and stored into ```src/units.json``` file. It is a list of all administrative units in Lithuania. 
UPDATE: It seems that the link above does not work now. Maybe you would be able to find a way around. A good place to start - Lithuania [profile](http://global.mapit.mysociety.org/area/363370.html).
2. ```createGeojson.js``` script filters ```src/units.json``` file and leaves municipalities only. It also adds properties like id, name and long name of each municipality. Finally it makes a request to MapIt API and gets a GeoJSON geometry data for each municipality. The output can be found at ```GeoJSON/LTU_OSM.geojson```.
3. Using ```topojson``` tool, ```GeoJSON/LTU_OSM.geojson``` file is converted to TopoJSON format. This step reduces file size from ~2MB to ~200KB. Geometry was also simplified to reduce file size even more (~200KB vs 40KB). If you need more detailed geometry, you should increase ```--simplify-proportion``` in a ```Makefile``` and run ```make createTopojson``` in Terminal. Output can be found at ```TopoJSON/LTU_OSM.topojson```.<br /> <br /> 
THIS STEP IS MANUAL:<br /> 
4. Some municipalities have inaccurate geometry, which includes parts of Curonian Lagoon. To fix this, ```GeoJSON/LTU_OSM.geojson``` was opened in ```QGIS``` program. Using ```OpenLayers``` plugin, the geometry was manually changed where needed. The output SHP, GeoJSON and TopoJSON files can be found in the [master branch](https://github.com/leakyMirror/map-of-lithuania). 

## Reading list
Read more about simplification [here](http://bost.ocks.org/mike/simplify/).<br /> 
Find out, how much simplification you need [here](http://www.mapshaper.org/) (drag and drop ```GeoJSON/LTU_OSM.geojson```).

