# Municipalities of Lithuania

This project creates a map of Lithuania divided into municipalities. The output is in GeoJSON, TopoJSON and SHP formats.

## How to use
GeoJSON, TopoJSON and SHP files are ready to use. 

## Dependencies
If you need to reproduce all process, you would need Node.js, npm, ogr2ogr, topojson (from npm).

## Description
1. Initial data is taken from MapIt global API http://global.mapit.mysociety.org/area/363370/covers and stored into helpers/units.json file. This is a list of all administrative units in Lithuania.
2. makeMap.js script filters helpers/units.json file and leaves municipalities only. It also adds properties like id, name and long name of each municipality. Finally it makes a request to MapIt API and gets a GeoJSON geometry data for each municipality. LTU_OSM.geojson file is saved to GeoJSON folder.
3. Some municipalities have inaccurate geometry, which includes parts of Curonian Lagoon. To fix this, LTU_OSM.geojson was opened in QGIS program. Using OpenLayers plugin, the geometry was manually changed where needed. The output was saved as SHP file in SHP folder.
4. SHP file was converted back to GeoJSON (GeoJSON/LTU_Edited_SHP.geojson). Since metadata from LTU_OSM.geojson file was not saved, the edited geometry data from LTU_Edited_SHP.geojson was manually pasted into LTU_OSM.geojson. File was renamed to LTU_Final.geojson.
5. Lastly GeoJSON file was converted to TopoJSON and stored in TopoJSON folder.

Use npm package topojson to convert geojson file to topojson format. Example commands can be found in convert.sh file
