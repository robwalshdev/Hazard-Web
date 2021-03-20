import { React } from "react";
import "./StatisticCard.css";

const StatisticCard = ({ statValue, statTitle }) => {
    return (
        <div className="StatisticCard">
            <h1>{statValue}</h1>
            <p>{statTitle}</p>
        </div>
    );
}

export default StatisticCard