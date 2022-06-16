import {BrowserRouter ,
        Route,Switch} from "react-router-dom" 
import LandingPG from './components/LandingPG';
import Home from './components/home';
import SearchName from './components/searcName'
import Details from './components/details';
import NewActivity from "./components/newActivity";

function App() { 
  return ( 
    <div >
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPG}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/search/:name" component={SearchName}/>
        <Route path="/countries/:id" component={Details}/>
        <Route path="/create" component={NewActivity}/>
      </Switch>
    </BrowserRouter>
    </div> 
  );
}

export default App;
