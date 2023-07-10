import { useContext, useState } from 'react';
import './sass/app.scss'
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { RouteContext } from './providers/RouteProvider';

function App() {
  const { route } = useContext(RouteContext);
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
        <Navbar login={login} />
        {(route === '/') && <Home />}
        {(route === '/login') && <Login />}
    </div>
  );
}

// If login is true, then check that route is /user to render UserProfile.
// If login is false, render UserLogin component (null until it is created)

export default App;