import React, {useEffect,useState} from "react";
import {Link,useHistory}from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {postActivities,getAllActivities} from "../actions"
import "./newActivity.css"
import validate from "./validate"

function NewActivity(){
    const dis=useDispatch()
    const his=useHistory()
    // const Activi=useSelector(state=>state.Activi)
    const allCountries=useSelector(state=>state.allCountries)
    
    let ListaDuPaisiños=allCountries.map(country=>{
        return({
            name:country.name,
            flag:country.Flag
        })
    })
    const [select,setSelect]=useState("")
    const [errors,setErrors]=useState({firstTry:true})
    const [formulario,setFormulario]=useState({
        nombre:"",Dificultad:"",Temporada:"",countries:[],Duracion:""
    })
    useEffect(()=>{
        dis(getAllActivities())
    },[dis])


    // function handleC(e){
    //     e.preventDefault();
    //     console.log(dis(postActivities(formulario)))
    // }
    function handleChange(e){
        setFormulario({ 
            ...formulario,
            [e.target.name] : e.target.value
        })
        if(!errors.firstTry){
            setErrors(validate({
                ...formulario,
                [e.target.name]:e.target.value
            }))
        }
    }
    function handleSeasons(e){
        if(e.target.value !== "Seleccionar" && !formulario.Temporada.includes(e.target.value)){
            setFormulario({
                ...formulario,
                Temporada:e.target.value
            })
            if(!errors.firstTry){
                setErrors(validate({
                    ...formulario,
                    Temporada:e.target.value
                }))
            }
        }
    }
    function handleCountries(e){
        if(e.target.value !== "Seleccionar" && !formulario.countries.includes(e.target.value)){
            setFormulario({
                ...formulario,
                countries:[...formulario.countries,e.target.value]
            })
            if(!errors.firstTry){
                setErrors(validate({
                    ...formulario,
                    countries:[...formulario.countries, e.target.value]
                }))
            }
        }
    }
    function deleteCountry(e){
        setFormulario({
            ...formulario,
            countries:formulario.countries.filter(countries=>countries !== e.target.value)
        })
        if(!errors.firstTry){
            setErrors(validate({
                ...formulario,
                countries:formulario.countries.filter(countries=>countries !== e.target.value)
            }))
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        if(formulario.nombre && formulario.Dificultad && formulario.Duracion && formulario.Temporada && formulario.countries.length>=1){
        dis(postActivities(formulario))
        alert("Se ha creado la actvidad")
        setFormulario({
            nombre:"",Dificultad:"",Temporada:"",countries:[],Duracion:""
        })
        errors.firstTry=false
        his.push("/home")
        }
        if(errors.firstTry){
            alert("complete los campos correspondientes")
        }
    }
    function handleE(e) {
        e.preventDefault();
        setErrors(validate({
            ...formulario,
            [e.target.name]: e.target.value,
            countries: [...formulario.countries, e.target.value]
        }))
        handleSubmit(e)
    }
    return(
        <div className="newActivity">
            <Link className="Link" to="/home"><button>Home</button></Link>
            <form className="formActivty" onSubmit={e=>handleSubmit(e)}>
            <h1>Crea la nueva actividad</h1>
                <div className="info">
                    <label>nombre:</label>
                    <input
                    type="text"
                    value={formulario.nombre}
                    name="nombre" 
                    onChange={e=>handleChange(e)}
                    />
                </div>
                <div className="info">
                <label>Dificultad (De 1 a 5):</label>
                    <input
                    type="text"
                    value={formulario.Dificultad}
                    name="Dificultad" 
                    onChange={e=>handleChange(e)}
                    />
                </div>
                <div className="info">
                    <h3>Temporada</h3>
                    <select onChange={e=>handleSeasons(e)}>
                        <option>Seleccionar</option>
                        <option value="Primavera">Primavera</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                    </select>
                </div>
                <div className="info">
                    <label>Duracion(de 24 Horas)</label>
                        <input
                        type="text"
                        name="Duracion"
                        value={formulario.Duracion}
                        onChange={e=>handleChange(e)}
                        />
                </div>
                <div className="info">
                    <h3>Paises</h3>
                    <select value={select} onChange={e=>[handleCountries(e),setSelect(e)]}>
                    <option>Seleccionar</option>
                    {ListaDuPaisiños?.map(country=>{
                        return(
                            <option key={country.name}>
                                {country.name}
                            </option>
                        )
                    })}
                    </select>
                </div>

                <div className="displayCountries">
                    {formulario.countries.map((country)=>{
                        return(
                            <div className="eachCountry" key={country}>
                            <p className="countryName">{country}</p>
                            <button className="closeButton" onClick={e=>deleteCountry(e)} value={country}>X</button>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {errors.name || 
                    errors.activity || 
                    errors.duration || 
                    errors.season || 
                    errors.countries ?
                    <button disabled>Crear Actividad</button>
                    :<button onClick={e => handleE(e)}>Crear Actividad</button>}
                    </div>
                {/* <button onClick={e=> handleC(e)}>XD</button> */}
            </form>
        </div>
    )
}
export default NewActivity