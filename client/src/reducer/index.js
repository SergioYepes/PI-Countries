import { actions } from "../actions";
const{GET_AllCOUNTRY,ITEMPG,BY_NAME,BY_ID,POST_ACTIVITIES,GET_ALL_ACTIVITIES,BY_ASC,
    BY_DESC,
    MAXP,
    MINP,
    CONTINENT,FILTER_BY_ACT}=actions
//NEXT_PAGE,PREVIOUS_PAGE
const initialState={
    allCountries:[],
    countryPG:[],
    currentPG:0,
    countryID:[],
    ByNameCountrys:[],
    Activi:[],
    BackCountries:[]   
}
function reducer(state=initialState, {type,payload}){
    switch(type){
        case GET_AllCOUNTRY:
            console.log(state.allCountries)
            return{
                ...state,
                allCountries:payload,
                countryPG:payload.slice(0,ITEMPG),
                BackCountries:payload,
                
            }
        // case NEXT_PAGE:
        //     return{
        //         ...state,
        //         countryPG:payload.countryPG,
        //         currentPG:payload.currentPG
        //     }  
        // case PREVIOUS_PAGE:
        //     return{
        //         ...state,
        //         countryPG:payload.countryPG,
        //         currentPG:payload.currentPG
        //     }   
        case BY_NAME:
            if(payload){
                return{
                    ...state,
                    ByNameCountrys:payload
                }
            }
            else{
                return{
                    ...state,
                    ByNameCountrys:[]
                }
            }
        case BY_ID:{
               return{
               ...state,
                countryID:payload
            }}
        case POST_ACTIVITIES:
            return{
                ...state,
            }
        
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
                Activi:payload
            }
        case BY_ASC:
            return {
                ...state,
                allCountries:payload
            }
        case BY_DESC:
            return{
                ...state,
                allCountries:payload
            }
        case MAXP:
            return{
                ...state,
                allCountries:payload
            }
        case MINP:
            return{
                ...state,
                allCountries:payload
            }
        case CONTINENT:
            return{
                ...state,
                allCountries:payload
            }
        case FILTER_BY_ACT:
            if(payload.length !==0){
                const selectAct=payload
                // console.log(selectAct)
                // console.log(state.Activi)
                let filterAct=state.Activi.filter((activity)=>{
                          return activity.nombre===selectAct[0]     
            })
                filterAct=filterAct.map(el=>{
                    return el.countries
                })

                console.log(filterAct[0].slice(0,ITEMPG))   
                return{
                    ...state,
                    allCountries:filterAct[0],
                    countryPG:filterAct[0].slice(0,ITEMPG),
                }
            }
                else{
                    return{
                        ...state,
                        allCountries:state.BackCountries
                    }
                }    
        default:
            return state  
    }
}
export default reducer;