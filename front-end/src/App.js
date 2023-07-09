import { useState, useEffect } from 'react';
import './sass/app.scss'
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import UserProfile from './components/UserProfile';

function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {}, [user])

  return (
    <div className="App">
      <Navbar login={login}/>
      <Home />
      <UserProfile />
    </div>
  );
}

export default App;
