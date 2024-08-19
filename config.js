var config = {
    //style: "mapbox://styles/mapbox/standard",
    style: "mapbox://styles/mapbox/light-v10", 
    //style: "mapbox://styles/mapbox/satellite-v9",
    //style: "mapbox://styles/mapator/clzqtf0vp00ai01pfbjxcfxs9",
    accessToken: "pk.eyJ1IjoibWFwYXRvciIsImEiOiJja3dxaXdvZm8wbXI5Mm9xb2JraDJmMjY3In0.cluUTNNRHJwurzUx6dMZDQ",
    showMarkers: false,
    markerColor: "#3FB1CE",
    theme: "dark",
    use3dTerrain: false,
    title: "Barna",
    subtitle: "Proves storytelling",
    byline: "BSC ",
    footer: "Source: Wikipedia",
    chapters: [{
            id: "volcan1",
            alignment: "left",
            hidden: false,
            title: "Sagrada Família",
            //image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Eyjafjallaj%C3%B6kull_first_crater_20100329.jpg",
            description: "También conocido como Eyjafjöll,2​ o Eyjafjalla,3​ es un volcán situado al norte de Skógar, en la región de Suðurland, al sur de Islandia.4​ Tiene entre 1651 m y 1666 m de altitud,​ y ha estado moderadamente activo en los últimos 8000 años.",
            location: {
                center: [2.17404, 41.40337],
                zoom: 16.72,
                pitch: 45.00,
                bearing: 0.00
            },
            mapAnimation: "flyTo",
            rotateAnimation: true,
            callback: "",
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ],
        },
        {
            id: "volcan2",
            alignment: "right",
            hidden: false,
            title: "Parc de la Pegaso",
            //image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Cr%C3%A1ter_del_Vesubio.jpg",
            //description: "Es un volcán activo del tipo vesubiano situado frente a la bahía de Nápoles y a unos nueve kilómetros de distancia de la ciudad de Nápoles. Se encuentra en la ciudad metropolitana de Nápoles, perteneciente a la región italiana de la Campania. Tiene una altura máxima de 1281 m s. n. m. y se alza al sur de la cadena principal de los Apeninos.",
            location: {
                center: [2.18931, 41.42719],
                zoom: 16.72,
                pitch: 45.00,
                bearing: 0.00
            },
            mapAnimation: "flyTo",
            rotateAnimation: true,
            callback: "",
            onChapterEnter: [],
            onChapterExit: [],
        },
        {
            id: "volcan3",
            alignment: "right",
            hidden: false,
            title: "Parc de la Ciutadella",
            image: "",
            //description: 'Kīlauea (en hawaiano: ˈkiːlɔuˈwɛjə) es un volcán en escudo, el más reciente y activo de los cinco que conforman la isla de Hawái. Es uno de los volcanes más activos de la Tierra <br><iframe width="415" height="315" src="https://youtu.be/sX7eC0kmSEA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            location: {
                center: [2.18672, 41.38841],
                zoom: 16.72,
                pitch: 45.00,
                bearing: 0.00
            },
            mapAnimation: "flyTo",
            rotateAnimation: true,
            callback: "",
            onChapterEnter: [],
            onChapterExit: [],
        },
    ],
};

/* QZ
function addEdificiosCapa() {

    map.addSource("edificios_source", {
        "type": "vector",
        "url": "mapbox://mapator.8h50cr32"  // mapbox: ID Tileset
    }); //fin map source

//////////////////////QZ
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
*/