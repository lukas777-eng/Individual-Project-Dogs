import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingDog from './components/landingDog';
import DogHome from './components/dogHome';
import createDog from './components/createDog';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
       <Route exact path='/' component= {LandingDog}/>
       <Route path='/DogHome' component= {DogHome}/>
       <Route path='/dogs' component= {createDog}/>

     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
