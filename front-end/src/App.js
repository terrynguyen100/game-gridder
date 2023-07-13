import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './sass/app.scss'
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import CreateTournament from './components/CreateTournament/CreateTournament';
import Error from './components/Error';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Tournaments from './components/Tournaments/Tournaments';
import Tournament from './components/Tournament/Tournament';
import { ErrorContext } from './providers/ErrorProvider';
import { AuthContext } from './providers/AuthProvider';
import { TournamentContext } from './providers/TournamentProvider';

function App() {
  const { userId } = useContext(AuthContext);
  const { error } = useContext(ErrorContext);
  const { t } = useContext(TournamentContext);
  console.log(t);


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
            <Route path="/tournaments/view" element={<Tournaments />} />  
            {t !== null  &&
              <Route path={`/tournaments/${t.tournamentInfo.id}`} 
                element={<Tournament tournament={t.tournamentInfo} 
                numOfPlayers={t.numOfPlayers}/>} 
              />}
          </Routes>
          {error !== '' && <Error />}
        </Router>
      </div>
    </LocalizationProvider>
  );
}

export default App;