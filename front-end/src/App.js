import { useState } from 'react';
import './sass/app.scss'
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import UserProfile from './components/UserProfile';

function App() {
  const [login, setLogin] = useState(false);
  const [route, setRoute] = useState('/');

  return (
    <div className="App">
      <Navbar login={login} />
      {(route === '/') && <Home />}
      {route === '/user' ? (login && <UserProfile />) : null}
    </div>
  );
}

// If login is true, then check that route is /user to render UserProfile.
// If login is false, render UserLogin component (null until it is created)

export default App;