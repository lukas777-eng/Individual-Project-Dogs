import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingDog from './components/landingDog';
import DogHome from './components/dogHome';
import createDog from './components/createDog';
import Detail from './components/dogDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
       <Route exact path='/' component= {LandingDog}/>
       <Route path='/DogHome' component= {DogHome}/>
       <Route path='/createDog' component= {createDog}/>
       <Route path='/dogs/:id' component= {Detail}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
