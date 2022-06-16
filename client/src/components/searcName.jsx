import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { byName } from "../actions";
import { useParams } from "react-router-dom";
import Cards from "./cards";
import "./searchName.css"

function SearchName(){
    const dis=useDispatch()
    const byNameCount=useSelector(state=> state.ByNameCountrys)
    const {name}=useParams()

    useEffect(()=>{
        dis(byName(name))
    },[dis,name])
    console.log(byNameCount)
    return(
        <div>
            <div>
                <h1 className="titulo"> Resultados para "{name}"</h1>
            </div>
            <div>
                <Cards countryPG={byNameCount}/>
            </div>
        </div>
    )
}
export default SearchName