# Convert GeoJSON to TopoJSON
topojson \
  --id-property id \
  --properties name \
  --properties longName \
  --out TopoJSON/LTU_OSM.topojson \
  GeoJSON/LTU_OSM.geojson

# Convert SHP to GeoJSON
ogr2ogr \
  -f GeoJSON \
  GeoJSON/LTU_Edited_SHP.geojson \
  SHP/LTU.shp

# Convert final GeoJSON to TopoJSON
topojson \
  --id-property id \
  --properties name \
  --properties longName \
  --out TopoJSON/LTU_Final.topojson \
  GeoJSON/LTU_Final.geojson