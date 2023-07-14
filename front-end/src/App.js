import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/app.scss';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import CreateTournament from './components/CreateTournament/CreateTournament';
import Error from './components/Error';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Tournaments from './components/Tournaments/Tournaments';
import Tournament from './components/Tournament/Tournament';
import { ErrorContext } from './providers/ErrorProvider';
import { AuthContext } from './providers/AuthProvider';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {
  const { userId } = useContext(AuthContext);
  const { error } = useContext(ErrorContext);

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#bb0c05',
      },
      secondary: {
        main: '#fcca46',
      },
    },
    typography: {
      fontFamily: 'Titillium Web',
      h1: {
        fontFamily: 'Bebas Neue',
      },
      h2: {
        fontFamily: 'Bebas Neue',
      },
      button: {
        fontFamily: 'Bebas Neue',
      },
      h3: {
        fontFamily: 'Bebas Neue',
      },
      h4: {
        fontFamily: 'Bebas Neue',
      },
      h5: {
        fontFamily: 'Bebas Neue',
      },
      h6: {
        fontFamily: 'Titillium Web',
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path={`/users/${userId}/profile`} element={<UserProfile />} />
              <Route path={`/users/${userId}/dashboard`} element={<Dashboard />} />
              <Route path="/tournaments/Create" element={<CreateTournament />} />
              <Route path="/tournaments/view" element={<Tournaments />} />
              <Route path={"/tournaments/:id"} element={<Tournament />} />
            </Routes>
            {error !== '' && <Error />}
          </Router>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;