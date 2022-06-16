import React, { useState } from "react";
import {Link} from "react-router-dom"
import "./searchBar.css"
function SearchBar(){
    const[nombre, setNombre]= useState('')
    function handleInput(e){
        e.preventDefault()
        setNombre(e.target.value)
    }
    function handleClick(e){
        setNombre("")
    }
    return(
        <div className="SearchB">
            <form>
                <input
                className="SearchBInput"
                type="text"
                value={nombre}
                onChange={e=>handleInput(e)}
                placeholder="Inserte paises...">
                </input>
                <Link to={`/search/${nombre}`}>
                    <button className="SearchBBT" onClick={e=>handleClick(e)}>BUSCAR</button>
                </Link>
            </form>
        </div>
    )
}
export default SearchBar