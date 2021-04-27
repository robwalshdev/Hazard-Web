import React from 'react'
import "./LandingPage.css";
import logo from "../../icons/car.svg"

const LandingPage = () => {
    return (
        <div className="LandingPage">
            <div className="Header">
                <div className="HeaderGroup">
                    <a href="/"><img src={logo} className="Logo" /></a>
                    <button>
                        <a href="/dashboard">Dashboard</a>
                    </button>
                </div>
            </div>

            <div className="Hero">
                <div className="HeroGroup">
                    <h1>Road Hazard<br />alert app for iOS</h1>
                    <p>View road hazards reported by the community of users and reliable online sources. Quickly report a hazard at your current location.</p>
                    <a href="https://github.com/robwalshdev/Hazard-iOS">GitHub</a>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
