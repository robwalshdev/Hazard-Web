import { React, useState, useEffect } from "react";
import "./Map.css";
import Card from "../Card/Card";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const Map = ({ hazards }) => {
    const [viewport, setViewport] = useState({
        latitude: 53.267611,
        longitude: -9.037080,
        zoom: 10,
        width: '100%',
        height: '100%'
    });

    const [selectedHazard, setSelectedHazard] = useState();

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedHazard(null);
            }
        };

        window.addEventListener("keydown", listener);

        // Cleanup
        return () => {
            window.removeEventListener("keydown", listener);
        }
    }, [])

    return (
        <div className="Map">
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/robwalshdev/ckli8pov81b6g17ql2c12z9ex"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(viewport) => {
                    setViewport(viewport)
                }}>

                {hazards ? hazards.map(hazard => (
                    <Marker
                        key={hazard.hazardId}
                        latitude={hazard.hazardLocation.latitude}
                        longitude={hazard.hazardLocation.longitude}>
                        <button className="Marker" onClick={(e) => {
                            e.preventDefault();
                            setSelectedHazard(hazard);
                        }} style={selectedHazard === hazard ? {
                            'background-color': 'rgba(51, 118, 242, 1.0)',
                            'box-shadow': '0 0 0 8pt rgba(51, 118, 242, 0.2)'
                        } : null}></button>
                    </Marker>
                )) : null}
            </ReactMapGL>

            {selectedHazard ? (
                <Card hazard={selectedHazard} />
            ) : null}

        </div>
    );
}

export default Map