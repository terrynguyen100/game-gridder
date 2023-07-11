import { useContext, useState } from 'react';
import './sass/app.scss'
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { RouteContext } from './providers/RouteProvider';

import Tournaments from './components/Tournaments/Tournaments';
import Tournament from './components/Tournament/Tournament';

function App() {
  const { route, changeRoute } = useContext(RouteContext);
  const [login, setLogin] = useState(false);
  const [t, setT] = useState({})

  const handleRoute = ({ tournament, numOfPlayers}) => {
    changeRoute(`/tournament/${tournament.id}`);
    setT({tournament, numOfPlayers})
  }

  return (
    <div className="App">
        <Navbar login={login} />
        {t.tournament && ((route === `/tournament/${t.tournament.id}`) && <Tournament tournament={t.tournament} numOfPlayers={t.numOfPlayers}/>)}
        <Tournaments handleRoute={handleRoute}/> 
        {(route === '/') && <Home />}
        {(route === '/login') && <Login />}
    </div>
  );
}

// If login is true, then check that route is /user to render UserProfile.
// If login is false, render UserLogin component (null until it is created)

export default App;