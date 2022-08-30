import React, { useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountry } from "../actions";
import Cards from "./cards"
import Filter from "./filters"
import NavBar from "./NavBar"
import Paginacion from "./paginacion";
import "./home.css"

function Home(){

    const dis=useDispatch()
    // const currentPG= useSelector((state)=>state.currentPG)
    const countryPG= useSelector((state)=>state.countryPG)
    const allCountries= useSelector((state)=>state.allCountries)//mapStateToProps
    const [currentValue,setValue]=useState(1)   
    const [TotalPage]=useState(9)
    
    useEffect(()=>{
        dis(getAllCountry())
    },[dis])
    
    const endIndex= currentValue*TotalPage
    const firstIndex= endIndex-TotalPage
    const currentItems= allCountries.slice(firstIndex,endIndex)
    
    function handleClick(e){
        e.preventDefault();
        dis(getAllCountry())
    }
    return( 
        <div className="Home">
            <NavBar/>  
            <h1 className="welcome">Bienvenido/a</h1>
            <div className="Filters">
                <Filter/>
            </div>
            <div className="paginado"> 
            <Paginacion countryPG={countryPG} TotalPage={TotalPage} setValue={setValue} currentValue={currentValue}/> 
            </div>
            <div className="Cards">
                <Cards countryPG={currentItems}/>
            </div>
            <div className="paginado"> 
            <Paginacion countryPG={countryPG} TotalPage={TotalPage} setValue={setValue} currentValue={currentValue}/> 
            </div>
            <button className="butoncho" onClick={e=>{handleClick(e)}}>reload:By SY</button>
        </div>   
    )
}
export default Home;