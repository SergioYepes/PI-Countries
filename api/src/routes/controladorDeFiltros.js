const{Country,Activity}= require("../db.js")

const nombreAs= async()=>{
    try {
        let asendente= await Country.findAll({
            order:[["name","ASC"]],
            include:[Activity]
        })
        return asendente
    } catch (error) {
        console.log("error en la funcion ascendente"+ error)
    }
}
const nombreDe= async()=>{
    try {
        let descendente= await Country.findAll({
            order:[["name","DESC"]],
            include:[Activity]
        })
        return descendente
    } catch (error) {
        console.log("error en la funcion descendente"+ error)
    }
}
const maxPoblacion= async()=>{
    try {
        let poblacion =await Country.findAll({
            order:[["Poblacion","DESC"]],
            include:[Activity]
        })
        return poblacion
    } catch (error) {
        console.log("error en la funcion maxPoblacion"+ error)
    }
}
const minPoblacion= async()=>{
    try {
        let poblacion =await Country.findAll({
            order:[["Poblacion","ASC"]],
            include:[Activity]
        })
        return poblacion
    } catch (error) {
        console.log("error en la funcion minPoblacion"+ error)
    }
}
const getContinent= async(continent)=>{
    try {
        let porContinente=await Country.findAll({
            where:{
                Continent:continent,
            },
            include:[Activity]
        })
        return porContinente
    } catch (error) {
        console.log("error en la funcion getContinent"+ error)
    }
}
module.exports={
    nombreAs,
    nombreDe,
    minPoblacion,
    maxPoblacion,
    getContinent
}