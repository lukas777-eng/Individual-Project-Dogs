import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingDog from './components/landingDog';
import DogHome from './components/dogHome';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
       <Route exact path='/' component= {LandingDog}/>
       <Route path='/DogHome' component= {DogHome}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
