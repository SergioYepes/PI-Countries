import React, {useEffect,useState}from "react";
import {useDispatch,useSelector} from "react-redux"
import "./filters.css"
import {filtradoContinent,getAllCountry,getAllActivities,filterByAct, filtradoAS, filtradoDESC, filtradoMaxP, filtradoMinP} from "../actions"

function Filter(){
    const dis=useDispatch()
    const countries=useSelector(state=>state.BackCountries)
    const allActivities= useSelector(state=>state.Activi)
    const [continent,setContinent]=useState("") 
    const [act, setAct]=useState([])
    const [az,setAz]=useState("")
    const [pob,setPob]=useState("")

    useEffect(()=>{
        if(az !==""){
            if(az==="Seleccionar"){
                dis(getAllCountry())
            }
            if(az==="asc"){
                dis(filtradoAS())
            }
            if(az==="desc"){
                dis(filtradoDESC())
            }
        }
    },[dis,az])
    useEffect(()=>{
        if(pob !==""){
            if(pob==="Seleccionar"){
                dis(getAllCountry())
            }
            if(pob==="max"){
                dis(filtradoMaxP())
            }
            if(pob==="min"){
                dis(filtradoMinP())
            }
        }
    },[dis,pob])
    useEffect(()=>{
        if(continent !== ""){
            if(continent === "Seleccionar"){
                dis(getAllCountry())
            }else{
                dis(filtradoContinent(continent))
            }
        }
    },[dis,continent])
    useEffect(()=>{
        dis(getAllActivities())
        dis(filterByAct(act))
    },[dis,act])
    const continentes=()=>{
        let lista=countries.map(country=>country.Continent)
        let continentes=lista.filter((continent,index)=>{
            return lista.indexOf(continent)===index
        })
        return continentes
    }
    function handleByContinent(e){
        setContinent(e.target.value)
    }
    function handleAct(e){
        if(e.target.value!=="Seleccionar" && !act.includes(e.target.value)){
            setAct([...act,e.target.value])
        }
    }
    function handleDelete(e){
        setAct(act.filter(act=>act !==e.target.value))
    }
    function handleByOrder(e){
        setAz(e.target.value)
    }
    function handleByPob(e){
        setPob(e.target.value)
    }

    return(
        <div className="filters">
            {/* <input id="filterdisplay" type="checkbox"></input>
            <label className="tittleDisplay" htmlFor="filterdisplay"><h2 className="tittlefilter">filters</h2></label> */}
            <div className="hiddenFilters">
                <h3>Filtros</h3>
                <div className="filterContinent">
                    <h3>Continentes</h3>
                    <div>
                        <select onChange={e=>handleByContinent(e)}>
                            <option>Seleccionar</option>
                            {continentes().map(con=>{
                                return(
                                    <option key={con} value={con}>{con}</option>
                                )
                                })}
                        </select>
                    </div>
                </div>
                <div className="Activities">
                    <div>
                        <h3>Actividades</h3>
                        <div>
                            <select onChange={e=> handleAct(e)}>
                                <option>Seleccionar</option>
                                {allActivities.map(acti=>{
                                    return(
                                        <option key={acti.id} value={acti.nombre}>{acti.nombre}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="DeleteAct">
                                {act.map(act=>{
                                    return(
                                        <div className="eachAct" key={act}>
                                            <p className="activiName">{act}</p>
                                            <button className="close" onClick={e=>handleDelete(e)} value={act}>X</button>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <div className="OrderByName">
                    <h3>Nombres</h3>
                    <div>
                        <select onChange={e=>handleByOrder(e)}>
                            <option>Seleccionar</option>
                            <option value="asc" >Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </div>
                </div>
                <div className="OrderByPob">
                    <h3>Poblacion</h3>
                    <div>
                        <select onChange={e=>handleByPob(e)}>                          
                            <option>Seleccionar</option>
                            <option value="max" >Max Poblacion</option>
                            <option value="min">Min Poblacion</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Filter