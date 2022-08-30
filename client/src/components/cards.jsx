import React from "react";
import Card from "./card";
import "./cards.css"
function Cards({countryPG}){
    return (
        <div className="cards">
            
            {countryPG && countryPG.map((country)=>{
                return(
                    <Card
                    key={country.id} 
                    id={country.id} 
                    name={country.name}
                    nombre={country.Nombre}
                    flag={country.Flag}
                    continent={country.Continent}
                    activities={country.activities}
                    />
                )
            })}
        </div>
    )
}
export default Cards