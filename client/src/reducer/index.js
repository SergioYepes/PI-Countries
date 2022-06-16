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
            return{
                ...state,
                allCountries:payload,
                countryPG:payload.slice(0,ITEMPG),
                BackCountries:payload

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
            // var filterActivities = state.countries.filter((p) => {
            //     let activities = p.Activi.filter( (a) => a.nombre.includes(payload));
            // console.log(filterActivities)
            //     if (activities && activities.length > 0) {
            //         return true;
            //     }
            //     return false;
            //    });
            if(payload.length !==0){
                const selectAct=payload
                const filterAct=state.BackCountries.filter((country)=>{
                    return selectAct.every(ele=> country.activities.map(activity=>activity.nombre).includes(ele))
                })
                console.log(filterAct)
                return{
                    ...state,
                    allCountries: filterAct
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