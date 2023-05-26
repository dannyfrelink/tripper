import ReactMap, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapMarker from './MapMarker';

interface MapProps {
    locations: string[];
}

interface ObjectType {
    [location: string]: number;
}

interface CoordinatesProps {
    [loc: string]: {
        latitude: number;
        longitude: number;
    }
}

const Map = ({
    locations
}: MapProps) => {
    const uniqueLocations = [...new Set(locations)]
    const map: ObjectType = { Canggu: 1, Ubud: 2, Amed: 3, Nusa: 4, Uluwatu: 5 };
    uniqueLocations.sort((x, y) => map[x] - map[y]);

    const coordinates: CoordinatesProps = {
        Canggu: {
            latitude: -8.58,
            longitude: 115.05
        },
        Ubud: {
            latitude: -8.45,
            longitude: 115.30
        },
        Amed: {
            latitude: -8.30,
            longitude: 115.55
        },
        Nusa: {
            latitude: -8.73,
            longitude: 115.52
        },
        Uluwatu: {
            latitude: -8.80,
            longitude: 115.15
        }
    }

    let lineData: {[loc: string]: any} = []
    uniqueLocations.map(loc =>
        lineData.push([
            coordinates[loc].longitude,
            coordinates[loc].latitude
        ]
    ));

    const codeOne = lineData.length > 1 && [lineData[0], lineData[1]];
    const codeTwo = lineData.length > 2 && [lineData[1], lineData[2]];
    const codeThree = lineData.length > 3 && [lineData[2], lineData[3]];
    const codeFour = lineData.length > 4 && [lineData[3], lineData[4]];

    const dataOne = codeOne && {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            codeOne[0],
            codeOne[1]
          ]
        }
    }

    const dataTwo = codeTwo && {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            codeTwo[0],
            codeTwo[1]
          ]
        }
    }

    const dataThree = codeThree && {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            codeThree[0],
            codeThree[1]
          ]
        }
    }

    const dataFour = codeFour && {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            codeFour[0],
            codeFour[1]
          ]
        }
    }

    return (
        <ReactMap
            initialViewState={{
                // Lat & Long of Bali
                latitude: -8.45,
                longitude: 115.05,
                zoom: 7.45
            }}
            style={{
                width: '100%',
                height: '208px',
                boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)'
            }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
        >
            {
                dataOne &&
                    <Source id="polylineLayerOne" type="geojson" data={dataOne}>
                        <Layer
                            id="lineLayerOne"
                            type="line"
                            source="my-data"
                            layout={{
                            "line-join": "round",
                            "line-cap": "round"
                            }}
                            paint={{
                            "line-color": "rgba(3, 170, 238, 0.5)",
                            "line-width": 5
                            }}
                        />
                    </Source>
            }

            {
                dataTwo &&
                    <Source id="polylineLayerTwo" type="geojson" data={dataTwo}>
                        <Layer
                            id="lineLayerTwo"
                            type="line"
                            source="my-data"
                            layout={{
                            "line-join": "round",
                            "line-cap": "round"
                            }}
                            paint={{
                            "line-color": "rgba(3, 170, 238, 0.5)",
                            "line-width": 5
                            }}
                        />
                    </Source>
            }

            {
                dataThree &&
                    <Source id="polylineLayerThree" type="geojson" data={dataThree}>
                        <Layer
                            id="lineLayerThree"
                            type="line"
                            source="my-data"
                            layout={{
                            "line-join": "round",
                            "line-cap": "round"
                            }}
                            paint={{
                            "line-color": "rgba(3, 170, 238, 0.5)",
                            "line-width": 5
                            }}
                        />
                    </Source>
            }

            {
                dataFour &&
                    <Source id="polylineLayerFour" type="geojson" data={dataFour}>
                        <Layer
                            id="lineLayerFour"
                            type="line"
                            source="my-data"
                            layout={{
                            "line-join": "round",
                            "line-cap": "round"
                            }}
                            paint={{
                            "line-color": "rgba(3, 170, 238, 0.5)",
                            "line-width": 5
                            }}
                        />
                    </Source>
            }
            
            {locations.includes('Canggu') &&
                <MapMarker
                    // Lat & Long of Canggu
                    latitude={-8.58}
                    longitude={115.05}
                    attractions={locations.filter(location => location === 'Canggu').length}
                    name='Canggu'
                />
            }

            {locations.includes('Ubud') &&
                <MapMarker
                    // Lat & Long of Ubud
                    latitude={-8.45}
                    longitude={115.30}
                    attractions={locations.filter(location => location === 'Ubud').length}
                    name='Ubud'
                />
            }

            {locations.includes('Amed') &&
                <MapMarker
                    // Lat & Long of Amed
                    latitude={-8.30}
                    longitude={115.55}
                    attractions={locations.filter(location => location === 'Amed').length}
                    name='Amed'
                />
            }
    
            {locations.includes('Nusa') &&
                <MapMarker
                    // Lat & Long of Nusa
                    latitude={-8.73}
                    longitude={115.52}
                    attractions={locations.filter(location => location === 'Nusa').length}
                    name='Nusa'
                />
            }
    
            {locations.includes('Uluwatu') &&
                <MapMarker
                    // Lat & Long of Uluwatu
                    latitude={-8.80}
                    longitude={115.15}
                    attractions={locations.filter(location => location === 'Uluwatu').length}
                    name='Uluwatu'
                />
            }
        </ReactMap>
    );
}

export default Map;