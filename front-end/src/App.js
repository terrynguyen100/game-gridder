import { useState } from 'react';
import './sass/app.scss'
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
      <Navbar login={login}/>
      <Home />
    </div>
  );
}

export default App;
