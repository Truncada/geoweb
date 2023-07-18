function addEdificiosCapa() {

    map.addSource("edificios_source", {
        "type": "vector",
        "url": "mapbox://mapator.8h50cr32"  // mapbox: ID Tileset
    }); //fin map source

    map.addLayer({
        "id": "edificios",
        "type": "fill-extrusion",
        "source": "edificios_source",
        "source-layer": "construcciones-5xd1nq", // Nombre Tileset
        "maxzoom": 21,
        "minzoom": 15,
        "filter": [">", "numberOfFl", 0],
        "paint": {
            "fill-extrusion-color": [
                "interpolate", ["linear"], ["number", ["get", "numberOfFl"]], //si vinc de geojson canvio 'numberOfF1'
                0, "#FFFFFF",
                1, "#e6b03d",
                3, "#e6b03d",
                6, "#3de66d",
                9, "#3de6b1",
                12, "#22ecf0",
                15, "#14b1fd",
                20, "#3d73e6",
                40, "#123a8f",
                80, "#ce2f7e",
                100, "transparent"
            ],
            "fill-extrusion-height": ["*", 2, ["to-number", ["get", "numberOfFl"]]], //to-number, el valor que passo com a altura no sé si és nombre o no. 
            "fill-extrusion-opacity": 0.9
        }
    }
    ,"road-label"
    );  

} //fin funcion

function filtrarEdificios(valor) {
    map.setFilter("edificios", [">", "numberOfFl", parseInt(valor)]);
    document.getElementById("altura").innerHTML = "Más de  <b>" + valor + "</b> pisos";
}

function addPopupToMapEdificios(nombreCapa) {

    map.on('click', function (e) {

        var text = "";
        var bbox = [[e.point.x - 10, e.point.y - 10], [e.point.x + 10, e.point.y + 10]];
        var features = map.queryRenderedFeatures(bbox, { layers: [nombreCapa] });

        if (features.length > 0) {
            for (key in features[0].properties) {

                if (key == "numberOfFl") {
                    text += "<b>Number of floors</b>:" + features[0].properties[key] + "<br>";
                }
                if (key == "localId") {
                    //localId 0004702DF3800C_part1
                    //http://ovc.catastro.meh.es/OVCServWeb/OVCWcfLibres/OVCFotoFachada.svc/RecuperarFotoFachadaGet?ReferenciaCatastral=0004701DF3800C
                    //https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCListaBienes.aspx?rc1=0004701&rc2=DF3800C

                    var localId = features[0].properties[key];

                    var localIdSplit = localId.split("_"); // 0004702DF3800C  part1
                    var parte1 = localIdSplit[0].substring(0, 7);
                    var parte2 = localIdSplit[0].substring(7, localIdSplit[0].length);
                    text += "<img width=200 src=http://ovc.catastro.meh.es/OVCServWeb/OVCWcfLibres/OVCFotoFachada.svc/RecuperarFotoFachadaGet?ReferenciaCatastral=" + localId + "><br>";
                    text += "<a target=blank href=https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCListaBienes.aspx?rc1=" + parte1 + "&rc2=" + parte2 + ">Cadastral record</a><br>";
                }

            }
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(text)
                .addTo(map);
        }
    });

    map.on('mouseenter', nombreCapa, function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', nombreCapa, function () {
        map.getCanvas().style.cursor = '';
    });

}
