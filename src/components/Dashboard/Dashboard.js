import { React } from "react";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import StatisticCard from "../StatisticCard/StatisticCard";
import Map from "../Map/Map";

const Dashboard = ({ token }) => {
  const [hazards, setHazards] = useState([]);

  const [queryTime, setQueryTime] = useState(24);

  useEffect(() => {
    if (token) {
      getHazards()
    }
  }, [queryTime]);

  const getHazards = async () => {
    const response = await fetch(`http://road-hazard.eu-west-1.elasticbeanstalk.com/hazard/${queryTime}?latitude=53.29969&longitude=-8.74752&radius=500`, {
      "headers": {
        "Authorization": `Bearer ${token}`,
      },
      "method": "GET",
    });
    const data = await response.json();
    setHazards(data)
  }

  const history = useHistory();

  return (
    <div className="Dashboard">
      <div className="SideBar">
        <div className="TitleBar">
          <a href="/">
            <svg width="94" height="82" viewBox="0 0 94 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7434 81.664H72.6477C78.3118 81.664 81.6809 78.3926 81.6809 72.7773V36.9863L86.5638 41.1367C87.4915 41.8691 88.5169 42.5527 89.7376 42.5527C91.788 42.5527 93.449 41.2832 93.449 39.1836C93.449 37.8652 93.058 36.9863 92.13 36.2051L81.6809 27.416V11.6445C81.6809 9.78909 80.4602 8.61719 78.6536 8.61719H74.2591C72.4036 8.61719 71.1829 9.78909 71.1829 11.6445V18.5781L51.7981 2.31839C48.7708 -0.220712 45.011 -0.220712 41.9837 2.31839L1.60278 36.2051C0.675076 36.9863 0.235596 38.0605 0.235596 39.0371C0.235596 40.8438 1.65158 42.5527 4.04418 42.5527C5.26488 42.5527 6.29028 41.8691 7.16918 41.1367L11.6614 37.3281V72.7773C11.6614 78.3926 15.0305 81.664 20.7434 81.664ZM58.0481 49.584C58.0481 47.7285 56.8274 46.5078 54.972 46.5078H38.8098C36.9544 46.5078 35.7337 47.7285 35.7337 49.584V74.6328H22.2083C20.011 74.6328 18.7415 73.2656 18.7415 71.0195V31.4199L45.597 8.86129C46.427 8.17769 47.4036 8.22659 48.136 8.86129L74.6497 31.0781V71.0195C74.6497 73.2656 73.3313 74.6328 71.1341 74.6328H58.0481V49.584Z" fill="black" />
            </svg>
          </a>

          <a href="/dashboard" className="Logo">
            Dashboard
          </a>

          <button onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            history.push('/')
          }}>
            <svg width="70" height="76" viewBox="0 0 70 76" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2871 21.0646C19.2871 14.2286 21.0938 7.73447 24.2676 2.07037C25 0.75207 23.9746 -0.517529 22.4121 0.214871C9.22856 6.61137 0 20.2345 0 35.713C0 57.2462 17.92 75.1173 39.4043 75.1173C51.2207 75.1173 61.9629 69.6973 69.1895 61.2501C70.0684 60.2735 69.7266 58.8575 67.9688 59.297C64.9414 60.0782 61.8653 60.4689 58.6914 60.4689C37.1582 60.4689 19.2871 42.5978 19.2871 21.0646Z" fill="black" />
            </svg>
          </button>
        </div>

        <hr />

        <h5>Filter by time</h5>
        <div className="Filter">
          <button
            onClick={(e) => {
              e.preventDefault();
              setQueryTime(4);
            }}
            className={queryTime === 4 ? 'TimeButtonSelected' : 'TimeButton'}
          >
            4 hrs
              </button>

          <button
            className="TimeButton"
            onClick={(e) => {
              e.preventDefault();
              setQueryTime(8);
            }}
            className={queryTime === 8 ? 'TimeButtonSelected' : 'TimeButton'}
          >
            8 hrs
              </button>

          <button
            className="TimeButton"
            onClick={(e) => {
              e.preventDefault();
              setQueryTime(24);
            }}
            className={queryTime === 24 ? 'TimeButtonSelected' : 'TimeButton'}
          >
            24 hrs
              </button>
        </div>
        <h5>Statistics</h5>
        <div className="Statistics">
          <StatisticCard statValue={hazards.length} statTitle="Total number of hazards"></StatisticCard>
          <StatisticCard statValue={hazards.filter(hazard => hazard.hazardType === "Traffic" || hazard.hazardType === "Incident").length} statTitle="Traffic related hazards"></StatisticCard>
          <StatisticCard statValue={hazards.filter(hazard => hazard.hazardType === "Road works").length} statTitle="Road work projects"></StatisticCard>
          <StatisticCard statValue={hazards.filter(hazard => hazard.hazardType === "Flooding").length} statTitle="Water related hazards"></StatisticCard>
          <StatisticCard statValue={hazards.filter(hazard => hazard.hazardType !== "Traffic" && hazard.hazardType !== "Incident" && hazard.hazardType !== "Road works" && hazard.hazardType !== "Flooding").length} statTitle="Other hazards"></StatisticCard>
          <StatisticCard statValue={hazards.filter(hazard => hazard.source === "AA").length} statTitle="AA reported hazards"></StatisticCard>
          <StatisticCard statValue={hazards.filter(hazard => hazard.source !== "AA").length} statTitle="Community reported hazards"></StatisticCard>
        </div>
      </div>

      <Map hazards={hazards} token={token} getHazards={getHazards} />
    </div>
  );
}

export default Dashboard;