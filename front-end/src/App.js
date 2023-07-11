import { useContext, useState } from 'react';
import './sass/app.scss'
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import CreateTournament from './components/CreateTournament/CreateTournament';
import { RouteContext } from './providers/RouteProvider';

import Tournaments from './components/Tournaments/Tournaments';
import Tournament from './components/Tournament/Tournament';

function App() {
  const { route, changeRoute } = useContext(RouteContext);
  const [login, setLogin] = useState(false);
  const [t, setT] = useState({})

  const handleRoute = ({ tournamentInfo, numOfPlayers}) => {
    console.log(tournamentInfo)
    changeRoute(`/tournament/${tournamentInfo.id}`);
    setT({tournamentInfo, numOfPlayers})
  }

  return (
    <div className="App">
        <Navbar login={login} />
        {t.tournamentInfo && ((route === `/tournament/${t.tournamentInfo.id}`) && <Tournament tournament={t.tournamentInfo} numOfPlayers={t.numOfPlayers}/>)}
        <Tournaments handleRoute={handleRoute}/> 
        {(route === '/') && <Home />}
        {(route === '/login') && <Login />}
        {(route === '/register') && <Register />}
        {(route === '/tournaments/create') && <CreateTournament />}
    </div>
  );
}

// If login is true, then check that route is /user to render UserProfile.
// If login is false, render UserLogin component (null until it is created)

export default App;