import axios from "axios"
export const actions={
    GET_AllCOUNTRY:"GET_AllCOUNTRY",
    ITEMPG: 9,
    NONE:"NONE",
    NEXT_PAGE:"NEXT_PAGE",
    PREVIOUS_PAGE:"PREVIOUS_PAGE",
    BY_NAME:"BY_NAME",
    BY_ID:"BY_ID",
    GET_ALL_ACTIVITIES:"GET_ALL_ACTIVITIES",
    POST_ACTIVITIES:"POST_ACTIVITIES",
    BY_ASC:"BY_ASC",
    BY_DESC:"BY_DESC",
    MAXP:"MAXP",
    MINP:"MINP",
    CONTINENT:"CONTINENT",
    FILTER_BY_ACT:"FILTER_BY_ACT",
}
const{
    GET_AllCOUNTRY,
    ITEMPG,
    NONE,
    NEXT_PAGE,
    PREVIOUS_PAGE,
    BY_NAME,
    BY_ID,
    GET_ALL_ACTIVITIES,
    BY_ASC,
    BY_DESC,
    MAXP,
    MINP,
    CONTINENT,
    FILTER_BY_ACT,
    //POST_ACTIVITIES
}=actions
export function getAllCountry(){
    return function (dispatch){
        return fetch("http://localhost:3001/countries")
        .then(response=> response.json())
        .then(post=> dispatch({type:GET_AllCOUNTRY,payload:post}))
        .catch(e=>"No se conecto bien")
    }
}
export function nextHandler(allCountries, currentPage){
    return function(dispatch){
        let totalElements = allCountries.length;
        let nextPage = currentPage+1;
        let firstIndex = nextPage * ITEMPG; //9
        let endIndex = firstIndex + ITEMPG; //18
        if(firstIndex >= totalElements) return dispatch({type: NONE, payload:{}});
        return dispatch({type: NEXT_PAGE, payload:{countryPG: allCountries.slice(firstIndex, endIndex),
            currentPG: nextPage
        }});
    }
}
export function prevHandler(allCountries, currentPage){
    return function(dispatch){
        let prevPage = currentPage-1;
        if(prevPage < 0) return dispatch({type: NONE, payload:{}});
        let firstIndex = prevPage * ITEMPG;
        let endIndex = currentPage * ITEMPG;
        return dispatch({type: PREVIOUS_PAGE, payload:{countryPG: allCountries.slice(firstIndex, endIndex),
            currentPG: prevPage
        }});
    }
}
export function byName(payload){
    return function(dispatch){
        return fetch(`http://localhost:3001/countries?name=${payload}`)
        .then(response=> response.json())
        .then(post=> dispatch({type:BY_NAME,payload:post}))
        .catch(e=>"No se conecto bien")
    }
}
export function byId(id){
    return async function(dispatch){
        try {
            const res= await fetch(`http://localhost:3001/countries/${id}`)
            const response= await res.json()
            return dispatch({type:BY_ID,payload:response})
            
        } catch (error) {
            console.log("No se conecto bien" + error)
    }
}
}
export function getAllActivities(){
    return async function(dispatch){
        try {
            const res= await fetch("http://localhost:3001/activities")
            const response= await res.json()
            return dispatch({type:GET_ALL_ACTIVITIES, payload:response})
        } catch (error) {
            
        }
    }
}
export function postActivities(payload){
    return async function(dispatch){
        try {
             let res = await axios.post("http://localhost:3001/activities", payload)
            return res.data
            
        } catch (error) {
            console.log("No se conecto bien el post",error)
        }
    }
    }
export function filtradoAS(){
    return function (dispatch){
        return fetch("http://localhost:3001/asc")
        .then(response=> response.json())
        .then(post=> dispatch({type:BY_ASC,payload:post}))
        .catch(e=>"No se conecto bien")
    }
}
export function filtradoDESC(){
    return function (dispatch){
        return fetch("http://localhost:3001/desc")
        .then(response=> response.json())
        .then(post=> dispatch({type:BY_DESC,payload:post}))
        .catch(e=>"No se conecto bien")
    }
}
export function filtradoMaxP(){
    return function (dispatch){
        return fetch("http://localhost:3001/maxP")
        .then(response=> response.json())
        .then(post=> dispatch({type:MAXP,payload:post}))
        .catch(e=>"No se conecto bien")
    }
}
export function filtradoMinP(){
    return function (dispatch){
        return fetch("http://localhost:3001/minP")
        .then(response=> response.json())
        .then(post=> dispatch({type:MINP,payload:post}))
        .catch(e=>"No se conecto bien")
    }
}
export function filtradoContinent(payload){
    return function (dispatch){
        return fetch(`http://localhost:3001/continent/${payload}`)
        .then(response=> response.json())
        .then(post=> dispatch({type:CONTINENT,payload:post}))
        .catch(e=>"No se conecto bien")
    }
}
export function filterByAct(payload){
    return {
        type: FILTER_BY_ACT,
        payload:payload
    }
}