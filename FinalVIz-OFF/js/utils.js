//----------------------------------------------------------------------------------------------//
// 1. Model: Definicions
//----------------------------------------------------------------------------------------------//
var map;

//Variable on es guardarà el que el fetch retrievi (guarda l'objecte geojson sencer)
refugis = {};

icones_refugis = [
  "match",
  ["get", "category_joined"],
  ["Others"],
  "marker-15",
  ["Markets"],
  "grocery-15",
  ["Museums"],
  "museum-15",
  ["Schools"],
  "schools-15",
  ["Parishes"],
  "place-of-worship-15",
  ["Hospitals"],
  "hospital-15",
  ["Libraries"],
  "library-15",
  ["Indoor Pools"],
  "swimming-15",
  ["Civic Centers"],
  "theatre-15",
  ["Outdoors Pools"],
  "swimming-15",
  ["Senior Centers"],
  "cafe-15",
  ["Shopping Centers"],
  "shop-15",
  ["Parks And Gardens"],
  "park-15",
  ["Social Service Centers"],
  "town-hall-15",
  "marker-15",
];

var popup = new mapboxgl.Popup({
  closeButton: false,
  //  closeOnClick: false,
});

//----------------------------------------------------------------------------------------------//
// 3. Components: On es defineixen els elements visuals
//----------------------------------------------------------------------------------------------//
addMap = function (basemapStyle) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFwYXRvciIsImEiOiJjbTZmam4waDgwNTZyMmtzMGdva2U2Z3RzIn0.-ATkyErnGnpGKRjeMZyDHQ";
  map = new mapboxgl.Map({
    container: "map", // container ID
    style: basemapStyle, // Estil pla per evitar superposició, quan s'afegeixen "symbols", si no s'afegeixen des de studio a un estil, s'han d'agafar els que per defecte són compatibles amb uns estils limitats
    center: [2.1415939309045324, 41.39262923727583], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 12, // starting zoom
    pitch: 45,
    bearing: -45,
    attributionControl: false,
  });

  //Navigation control: physical zoom and re-orienting to north
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.AttributionControl({ compact: true })); //atribució down-right col·lapsada

  map.on("style.load", () => {
    map.setFog({
      /*
      color: 'rgb(186, 210, 235)', // Lower atmosphere
      'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
      'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
      'space-color': 'rgb(11, 11, 25)', // Background color
      'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
    */
    });
    /*map.setLights([
      {
        id: "sunlight",
        type: "directional", // ambient | directional | flat
        properties: {

        }
      },
    ])*/
  }); //fi onstyleload
}; //fi addMap

add3Dbuildings = function (simb_buildings) {
  //2. Edificis en 3d
  map.addSource("edificis_source", {
    type: "vector",
    url: "mapbox://mapator.2yd1rroh", // mapbox: ID Tileset, Barnai
  });
  map.addLayer({
    id: "edificis",
    type: "fill-extrusion",
    source: "edificis_source",
    "source-layer": "Barnaiv-b5wkn1", // Nombre Tileset
    maxzoom: 22,
    minzoom:14,
    paint: {
      "fill-extrusion-color": simb_buildings,
      "fill-extrusion-height": ["*", 2, ["to-number", ["get", "numberOfFl"]]], //to-number, el valor que passo com a altura no sé si és nombre o no.
      "fill-extrusion-opacity": 0.9,
    },
  });
}; //fi add3Dbuildings

//----------------------------------------------------------------------------------------------//
// 5. Comportaments
//----------------------------------------------------------------------------------------------//
async function sendRequest(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
    alert("Request error");
    return null;
  }
} //fi enviarpeticion

readContent = function () {
  map.addSource("refugisClimatics", {
    type: "geojson",
    data: refugis,
  });

  map.addLayer({
    id: "refugisClimatics",
    type: "symbol",
    source: "refugisClimatics",
    layout: {
      "icon-image": icones_refugis,
      "icon-size": 2,
    },
  });
}; //fi readContent

function addPopupToMap(layerName) {
  map.on("mousemove", layerName, function (e) {
    var text = "";
    console.info(e);
    for (key in e.features[0].properties) {
            if (key == "name") {  
                text += "<h2>" + e.features[0].properties[key] + "</h2>" + "<br>";
            }
            if (key == "address") {
                text+= e.features[0].properties[key] + "<br>";
            }
            if (key == "image") {
                text += "<img width=200 src="+ e.features[0].properties[key]+"><br>";
            }
    }

    popup.setLngLat(e.lngLat).setHTML(text).addTo(map);
  });

  map.on("mouseenter", layerName, function () {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", layerName, function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
} //fi addpopuptomap

function activateRotation() {
  const rotateNumber = map.getBearing();
  map.rotateTo(rotateNumber + 90, {
    duration: 24000,
    easing: function (t) {
      return t;
    },
  }); //fi rotateTo
} //fi activateRotation
