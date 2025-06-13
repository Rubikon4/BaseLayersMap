// Инициализация вектора Москвы
const moscowVectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'moscow.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'purple',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(128, 0, 128, 0.1)'
        })
    })
});

// Инициализация карты OpenLayers
const map = new ol.Map({
    target: document.getElementById("map"),
    layers: [
        new ol.layer.Tile({
            visible: true,
            basemap: true,
            name: "backgroundRadioOSM",
            source: new ol.source.OSM(),
        }),

        new ol.layer.Tile({
            visible: false,
            basemap: true,
            name: "backgroundRadioBing",
            source: new ol.source.XYZ({
                attributions: [
                    'Tiles <a href="https://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer">ArcGIS</a>'
                ],
                url: "https://services.arcgisonline.com/arcgis/rest/services/" + "World_Imagery/MapServer/tile/{z}/{y}/{x}"
            }),
        }),

        new ol.layer.Tile({
            visible: false,
            basemap: true,
            name: "backgroundRadioStreet",
            source: new ol.source.XYZ({
                attributions: [
                    'Tiles <a href="https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer">ArcGIS</a>'
                ],
                url: "https://services.arcgisonline.com/arcgis/rest/services/" + "World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            }),
        }),

        new ol.layer.Tile({
            visible: false,
            basemap: true,
            name: "backgroundRadioSrelief",
            source: new ol.source.XYZ({
                attributions: [
                    'Tiles <a href="https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
                ],
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/" + "World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            }),
        }),
        moscowVectorLayer // Добавляем векторный слой Москвы
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.6173, 55.7558]),  // Зум на Москву по умолчанию
        zoom: 4
    })
    
});

// Функция для переключения базовых карт
var ratioFunction = function (event) {
    var checkbox = event.target;
    var layerName = this.id;
    if (checkbox.checked) {
        map.getLayers().forEach(function (l) {
            if (l.get('name') == layerName) {
                l.setVisible(true);
            } else if (l.get('basemap') == true) {
                l.setVisible(false);
            }
        });
    }
};

// Навешиваем обработчики на радиокнопки
document.querySelectorAll('input[name="backgroundRadio"]').forEach(function (radio) {
    radio.addEventListener('change', ratioFunction);
});

// Доп. функция для переключения прочих слоёв (например, векторных)
var checkFunction = function (event) {
    var checkbox = event.target;
    var layerName = this.name;
    if (checkbox.checked) {
        map.getLayers().forEach(function (l) {
            if (l.get('name') == layerName) {
                l.setVisible(true);
            }
        });
    } else {
        map.getLayers().forEach(function (l) {
            if (l.get('name') == layerName) {
                l.setVisible(false);
            }
        });
    }
};