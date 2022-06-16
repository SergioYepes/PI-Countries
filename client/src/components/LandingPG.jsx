import React from "react";
import {Link} from "react-router-dom"
import "./landing.css"
const logo="https://w7.pngwing.com/pngs/387/24/png-transparent-drawing-computer-icons-world-map-miscellaneous-globe-logo.png"
function LandingPG(){
    return(
        <div className="landing">
            <h1 className ="landingName">El Mundo en tus manos; “Un viaje de mil millas comienza con un solo paso”. Lao Tzu</h1>
            <Link to ="/home" className="landingLink">
                <button>THE BEGINNING</button>
                <img src={logo}alt="Logo" height='50px'/>
            </Link>
        </div>
    )
}
export default LandingPG;