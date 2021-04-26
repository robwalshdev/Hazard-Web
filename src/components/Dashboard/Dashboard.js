import { React } from "react";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import ReportHazard from "../Report/ReportHazard";
import StatisticCard from "../StatisticCard/StatisticCard";
import Map from "../Map/Map";

const Dashboard = ({ token }) => {
    const [hazards, setHazards] = useState([]);
  
    const [queryTime, setQueryTime] = useState(24);

    useEffect(() => {
        if(token) {
          getHazards()
        }
    }, [queryTime]);

    const getHazards = async () => {
        const response = await fetch(`http://road-hazard.eu-west-1.elasticbeanstalk.com/${queryTime}?latitude=53.29969&longitude=-8.74752&radius=500`, {
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "method": "GET",
        });
        const data = await response.json();
        setHazards(data)
      }

    return (
        <div>
            <div className="SideBar">
            <h1>Dashboard</h1>
            <ReportHazard></ReportHazard>

            <h2>Statistics</h2>
            <div className="Statistics">
            <StatisticCard statValue={hazards.length} statTitle="Total number of hazards"></StatisticCard>
            <StatisticCard statValue={hazards.filter(hazard => hazard.hazardType === "Traffic").length} statTitle="Traffic related hazards"></StatisticCard>
            <StatisticCard statValue={hazards.filter(hazard => hazard.hazardType !== "Traffic").length} statTitle="Other hazards"></StatisticCard>
            <StatisticCard statValue={1} statTitle="Active users"></StatisticCard>
            </div>
        </div>

        <div className="Filter">
            <button
            onClick={(e) => {
                e.preventDefault();
                setQueryTime(4);
            }}
            className={queryTime === 4 ? 'TimeButtonSelected' : 'TimeButton'}>
            4 hrs
            
            </button>
            <button
            className="TimeButton"
            onClick={(e) => {
                e.preventDefault();
                setQueryTime(8);
            }}
            className={queryTime === 8 ? 'TimeButtonSelected' : 'TimeButton'}>
            8 hrs
            </button>
            <button
            className="TimeButton"
            onClick={(e) => {
                e.preventDefault();
                setQueryTime(24);
            }}
            className={queryTime === 24 ? 'TimeButtonSelected' : 'TimeButton'}>
            24 hrs
            </button>
        </div>

        <Map hazards={hazards} />
      </div>
    );
}

export default Dashboard;