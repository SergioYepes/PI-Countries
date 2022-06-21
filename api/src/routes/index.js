//DIVIDE ET IMPERA


const { nombreAs,
    nombreDe,
    minPoblacion,
    maxPoblacion,
    getContinent}=require("../routes/controladorDeFiltros.js")
const { Router } = require('express');
const fetch = require('node-fetch');
const {Activity} = require("../db.js");
const {Country}= require("../db.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const API="https://restcountries.com/v3/all"

const todoBase=async(id)=>{
    return await Country.findByPk(id,{
        include:[Activity]
            // model:Activity,
            // atributes:["name"],
            // through:{
            //     atributes:[]
            //  }
        
    })
}
// Configurar los routers
router.post("/activities",async(req,res)=>{
    let{nombre,Dificultad,Temporada,countries,Duracion}=req.body
    if(!nombre||!Dificultad||!Temporada||!Duracion||!countries)return res.status(404).send("Falta enviar datos obligatorios")
    try {
        let [newActivity] = await Activity.findOrCreate({
            where:{
                nombre,
                Dificultad,
                Temporada,
                Duracion,
                },  
        });

        let selectCountries = await Country.findAll({
            where: {
                name: countries
            },
        });
        const lit= newActivity.addCountry(selectCountries)
        return res.send("creado")
    } catch (error) {
        console.log('Error postActivity en controller ' + error)
    }
})
router.get("/activities",async(req,res)=>{
    try {
        let byActivities = await Activity.findAll({
            include:[Country]
        });
        return res.json(byActivities)
    } catch (error) {
        console.log('Error en get activities en la funcion ' + error)
    }
})
router.get("/countries",async(req,res)=>{
    const{name}=req.query
    const api=await fetch(`${API}`).then(res=>res.json())
    let guarda=[]

    if(!name){
        
    try{
        const paises=api.map((c)=>{
            return{
                    id:c.cca3,
                    name:c.name.common, 
                    Nombre:c.name.official ,
                    Image:c.maps.googleMaps ,
                    Continent:c.continents[0],
                    SubRegion:c.subregion ? c.subregion :"Undefined SubRegion",
                    Capital:c.capital ? c.capital[0]:"Undefined Capital",
                    Area:c.area,    
                    Poblacion:c.population,
                    Flag:c.flags[1],
                };
    })
        paises.forEach(c => {
        Country.findOrCreate({
            where:{id:c.id,
                name:c.name, 
                Nombre:c.Nombre,
                Image:c.Image,
                Continent:c.Continent,
                SubRegion:c.SubRegion, 
                Capital:c.Capital ,
                Area:c.Area, 
                Poblacion:c.Poblacion,
                Flag:c.Flag,},
            }) 
        });  

    return res.json(paises)
    }
    catch(error){
        console.log("error")
    }
} else {
    try{
    const filtro=api.find((p)=>p.name.common.includes(name)||p.name.official.includes(name))
    let sacaData=(data,array)=>{
        const {cca3,name,maps,continents,subregion,capital,area,population,flags}=data
        array.push({id:cca3,
            name:name.common,
            Nombre:name.official,
            Image:maps.googleMaps,
            Continent:continents[0],
            SubRegion:subregion,
            Capital:capital[0],
            Area:area,
            Poblacion:population,
            Flag:flags[1],
            })
      }
    console.log(filtro)
    sacaData(filtro,guarda)
     res.json(guarda)
    }
    catch (error) {
        console.log("error")
    }
}

})
router.get('/countries/:id', async (req, res)=>{
    let {id} = req.params;  
    try {
        // const con=await base.filter(b=>b.id===id) 
        const base=await todoBase(id)
        if(base) return res.json(base)
        res.status(404).send(`El código '${id}' no corresponde a un pais existente`)
            
    } catch (error) {
        console.log(error)
    }
});
router.get("/asc",async(req,res)=>{
    try {
        let az=await nombreAs()
        res.status(200).send(az)
    } catch (error) {
        console.log("error en la ruta /asc" + error)
    }
})
router.get("/desc",async(req,res)=>{
    try {
        let za =await nombreDe()
        res.status(200).send(za)
    } catch (error) {
        console.log("error en la ruta /desc"+ error)
    }
})
router.get("/maxP",async(req,res)=>{
    try {
        let maxP=await maxPoblacion()
        res.status(200).send(maxP)
    } catch (error) {
        console.log("error en la ruta /maxP" + error)
    }
})
router.get("/minP",async(req,res)=>{
    try {
        let minP=await minPoblacion()
        res.status(200).send(minP)
    } catch (error) {
        console.log("error en la ruta /minP"+error)
    }
})
router.get("/continent/:continent",async(req,res)=>{
    const continent= req.params.continent
    try {
        let porCont= await getContinent(continent)
        res.status(200).send(porCont)
    } catch (error) {
        console.log("error en la ruta /continent" + error)
    }
})

module.exports = router;
