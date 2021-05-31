import { React, useState, useEffect } from "react";
import "./Map.css";
import Card from "../Card/Card";
import ReactMapGL, { Marker } from "react-map-gl";

async function reportHazard(hazard, token) {
    return fetch('http://road-hazard.eu-west-1.elasticbeanstalk.com/hazard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Security-Policy": "upgrade-insecure-requests"
        },
        body: JSON.stringify(hazard)
    })
        .then(data => data.json())
}

const Map = ({ hazards, token, getHazards }) => {
    // Map Config
    const [viewport, setViewport] = useState({
        latitude: 53.267611,
        longitude: -9.037080,
        zoom: 10,
        width: '100%',
        height: '100%'
    });

    // View selected Hazrads
    const [selectedHazard, setSelectedHazard] = useState();

    // Report new Hazrad
    const [clickLocation, setClickLocation] = useState();
    const [hazardName, setHazardName] = useState();
    const [hazardType, setHazardType] = useState();
    const [description, setDescription] = useState();


    const handleSubmit = async e => {
        e.preventDefault();

        const hazardLocation = {
            'longitude': clickLocation[0],
            'latitude': clickLocation[1]
        }

        const source = 'Admin';

        const hazard = await reportHazard({
            hazardName,
            hazardType,
            description,
            hazardLocation,
            source
        }, token)

        setClickLocation(null)
        setHazardName(null)
        setHazardType(null)
        setDescription(null)

        getHazards()
    }

    // Event Listner - ESC Key to hide cards
    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedHazard(null);
                setClickLocation(null)
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
                }}
                onClick={(evt) => {
                    setClickLocation(evt.lngLat)
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

                {clickLocation ? (
                    <Marker
                        key={1}
                        latitude={clickLocation[1]}
                        longitude={clickLocation[0]}
                    >
                        <button className="Marker ReportMarker" onClick={(e) => {
                            e.preventDefault();
                        }} ></button>
                    </Marker>
                ) : null}
            </ReactMapGL>

            {selectedHazard ? (
                <Card hazard={selectedHazard} />
            ) : null}

            {clickLocation ? (
                <form onSubmit={handleSubmit} className="ReportForm">
                    <h3>Report Hazard</h3>
                    <div className="HazardCentreContainer">
                        <div></div>
                        <input type="text" placeholder="Title" className="HazardInput" onChange={e => setHazardName(e.target.value)} />
                        <div></div>
                    </div>
                    <div className="HazardCentreContainer">
                        <div></div>
                        <input type="text" placeholder="Type" className="HazardInput" onChange={e => setHazardType(e.target.value)} />
                        <div></div>
                    </div>
                    <div className="HazardCentreContainer">
                        <div></div>
                        <input type="text" placeholder="Description" className="HazardInput" onChange={e => setDescription(e.target.value)} />
                        <div></div>
                    </div>
                    <div className="HazardCentreContainer">
                        <div></div>
                        <button type="submit" className="ReportButton">Report</button>
                        <div></div>
                    </div>
                </form>
            ) : null}
        </div>
    );
}

export default Map