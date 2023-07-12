import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { AuthContext } from './providers/AuthProvider';

function App() {
  const { changeRoute } = useContext(RouteContext);
  const { userId } = useContext(AuthContext);
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
        <Router>
          <Navbar />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={`/users/${userId}/profile`} element={<UserProfile />} />
            <Route path="/tournaments/Create" element={<CreateTournament />} />
            <Route path="/tournaments/*" element={<Tournaments handleRoute={handleRoute} />} />
            {t.tournamentInfo && 
              <Route path={`/tournaments/${t.tournamentInfo.id}`} 
                element={<Tournament tournament={t.tournamentInfo} numOfPlayer={t.numOfPlayers} />} 
              />}

          </Routes>
          {/* {t.tournamentInfo && ((route === `/tournament/${t.tournamentInfo.id}`) && <Tournament tournament={t.tournamentInfo} numOfPlayers={t.numOfPlayers}/>)} */}
          {/* <Tournaments handleRoute={handleRoute}/>  */}
          {/* {(route === '/') && <Home />}
          {(route === '/login') && <Login />}
          {(route === '/register') && <Register />}
          {(route === '/user') && <UserProfile />}
          {(route === '/tournaments/create') && <CreateTournament />} */}
          {error !== '' && <Error />}
        </Router>
      </div>
    </LocalizationProvider>
  );
}

export default App;