import './App.css';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import Card from "./Card";
import ReportHazard from "./ReportHazard";
import StatisticCard from "./StatisticCard";

const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 53.267611,
    longitude: -9.037080,
    zoom: 10,
    width: '100%',
    height: '100%'
  });

  const [hazards, setHazards] = useState([]);
  const [selectedHazard, setSelectedHazard] = useState();

  useEffect(() => {
    getHazards()
  }, [])

  const getHazards = async () => {
    const response = await fetch(`http://localhost:5000/hazard/40?latitude=53.29969&longitude=-8.74752&radius=50`);
    const data = await response.json();
    setHazards(data)
  }

  return (
    <div className="App">
      <div className="SideBar">
        <h1>Dashboard</h1>
        <ReportHazard></ReportHazard>

        <h2>Statistics</h2>
        <div className="Statistics">
          <StatisticCard statValue={10}></StatisticCard>
          <StatisticCard statValue={10}></StatisticCard>
          <StatisticCard statValue={10}></StatisticCard>
          <StatisticCard statValue={10}></StatisticCard>
        </div>
      </div>

      <div className="Map">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/robwalshdev/ckli8pov81b6g17ql2c12z9ex"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(viewport) => {
            setViewport(viewport)
          }}>

          {hazards.map(hazard => (
            <Marker
              key={hazard.hazardId}
              latitude={hazard.hazardLocation.latitude}
              longitude={hazard.hazardLocation.longitude}>
              <button className="Marker" onClick={(e) => {
                e.preventDefault();
                setSelectedHazard(hazard);
              }}></button>
            </Marker>
          ))}

          {selectedHazard ? (
            <Popup
              className="Popup"
              latitude={selectedHazard.hazardLocation.latitude}
              longitude={selectedHazard.hazardLocation.longitude}
              onClose={() => {
                setSelectedHazard(null)
              }}>

              <Card
                title={selectedHazard.hazardName}
                type={selectedHazard.hazardType}>
              </Card>

            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    </div>

  );
}

export default App;
