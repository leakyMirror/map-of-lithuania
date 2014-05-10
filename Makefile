install:
	npm install

createFolders:
	mkdir GeoJSON TopoJSON

createGeoJSON:
	node src/createGeoJSON.js

createTopoJSON:
	topojson \
		--id-property id \
		--properties name \
		--properties longName \
		--out TopoJSON/LTU_OSM.topojson \
		--simplify-proportion .1 \
		GeoJSON/LTU_OSM.geojson