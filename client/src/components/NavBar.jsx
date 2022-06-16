import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "./searchBar"
import './navBar.css'
const logo="https://w7.pngwing.com/pngs/387/24/png-transparent-drawing-computer-icons-world-map-miscellaneous-globe-logo.png"
function NavBar(params) {
    return(
        <div className="navbar">
                <div className="logo">
                    <Link to='/'>
                        <img src={logo} alt="Logo" height='70px'/>
                    </Link>
                </div>
            
                <div className="links">
                    <div>
                        <Link className="Link" to='/home'>
                            <div className="linkToHome">Inicio</div>
                        </Link>
                    </div>
                    <div>
                        <Link className="Link" to='/create'>
                            <div className="linkToCreate">Nueva Actividad</div>
                        </Link>
                    </div>
                    <div className="searchBar">
                        <SearchBar/>
                    </div>
                </div>
        </div>
    )
};

export default NavBar;