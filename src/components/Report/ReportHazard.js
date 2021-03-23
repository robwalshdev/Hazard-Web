import { React } from "react";
import "./ReportHazard.css";

const ReportHazard = () => {
    return (
        <div className="Report">
            <h2>Report Hazard</h2>
            <h5>Admin Alert</h5>
            <p>
                <input type="text" placeholder="Description"></input>
            </p>
            <p>
                <input type="text" placeholder="Type"></input>
            </p>
            <p>
                <input type="text" placeholder="Location"></input>
            </p>
            <button onClick={((e) => {
                e.preventDefault();
            })} className="PostButton">Submit</button>
        </div>
    );
}

export default ReportHazard