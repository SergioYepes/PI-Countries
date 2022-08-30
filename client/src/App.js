import {BrowserRouter ,
        Route,Switch} from "react-router-dom" 
import LandingPG from './components/LandingPG';
import Home from './components/home';
import SearchName from './components/searcName'
import Details from './components/details';
import NewActivity from "./components/newActivity";
import Error from './components/error404'

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
        <Route path="*" component={Error}/>
      </Switch>
    </BrowserRouter>
    </div> 
  );
}

export default App;
