import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams,Link } from "react-router-dom";
import { byId } from "../actions"
import "./details.css"

function Details(){
    const dis=useDispatch()
    const countryID= useSelector(state=> state.countryID)
    let {name,Nombre,Flag,Continent,Capital,SubRegion,Area,Poblacion,activities}=countryID
    let {id}=useParams()
    useEffect(()=>{
        dis(byId(id))
    },[dis,id])
    // function handleClick(e){
    //     e.preventDefault();
    //     console.log(dis(byId(id)))
    // }
    
    return(
        <div className="details">
            <div className="detailCard" key={id}>
            <div className="columns">
                    <div className="columnLeft">
                        
                    <div className="countryInfo">
                    <img className="detailImg" src={Flag} alt={name} />                    
                    </div>
                    <div className="countryInfo">
                        <h1>Pais:</h1>
                        <h1 className="detailTitle">{Nombre}</h1>                        
                    </div>
                    <div className="countryInfo">
                        <h3>Capital:</h3>
                        <h3 className="detailCapital">{Capital}</h3>                      
                    </div>
                    <div className="countryInfo">
                        <h3>Continente:</h3>
                        <h3 className="detailContinent">{Continent}</h3>                       
                    </div>
                    <div className="countryInfo">
                        <h3>Subregion:</h3>
                        <h3 className="detailSubregion">{SubRegion}</h3>                       
                    </div>
                    <div className="countryInfo">
                        <h3>Area:</h3>
                        <h3 className="detailArea">{Area}</h3>   
                    </div>
                    <div className="countryInfo">
                        <h3>Poblacion:</h3>
                        <h3 className="detailPopulation">{Poblacion}</h3>        
                    </div>
                    </div>
                    <div className="columnRight">

                        <h2 className="activitiesTitle">Actividades:</h2>
                    <div className="countryInfo">
                        <div className="detailActivities">

                        {activities && activities.map(activites => {
                            return(
                                <h2  key={activites.id}>
                                Nombre:{activites.nombre} <br/> 
                                Dificultad:{activites.Dificultad}<br/>
                                Temporada:{activites.Temporada}<br/>
                                Duracion:{activites.Duracion}</h2>        
                                )
                            })}
                            
                        </div>  
                        {/* <button onClick={e=>handleClick(e)}>prueba</button> */}
                    </div>
                    </div>
                </div>
                <Link className="Link" to={`/home`}>
                            <button className="HomeBT"  >home</button>
                        </Link> 
            </div>
        </div>
    )
}
export default Details