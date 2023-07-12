import { useContext, useState } from 'react';
import './sass/app.scss'
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import CreateTournament from './components/CreateTournament/CreateTournament';
import Error from './components/Error';

import { RouteContext } from './providers/RouteProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Tournaments from './components/tournaments/Tournaments';
import Tournament from './components/Tournament/Tournament';
import { ErrorContext } from './providers/ErrorProvider';

function App() {
  const { route, changeRoute } = useContext(RouteContext);
  const { error } = useContext(ErrorContext);
  const [t, setT] = useState({})

  const handleRoute = ({ tournamentInfo, numOfPlayers}) => {
    console.log(tournamentInfo)
    changeRoute(`/tournament/${tournamentInfo.id}`);
    setT({tournamentInfo, numOfPlayers})
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Navbar />
        {t.tournamentInfo && ((route === `/tournament/${t.tournamentInfo.id}`) && <Tournament tournament={t.tournamentInfo} numOfPlayers={t.numOfPlayers}/>)}
        <Tournaments handleRoute={handleRoute}/> 
        {(route === '/') && <Home />}
        {(route === '/login') && <Login />}
        {(route === '/register') && <Register />}
        {(route === '/user') && <UserProfile />}
        {(route === '/tournaments/create') && <CreateTournament />}
        {error !== '' && <Error />}
      </div>
    </LocalizationProvider>
  );
}

export default App;