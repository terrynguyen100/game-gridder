import '../../sass/navbar.scss'
import Button from '@mui/material/Button' 

const Navbar = () => {
  return (
    <div className="nav">
      <div className="logo">GAMEGRIDDER</div>
      <div className="nav-items">
        <Button color="inherit" variant="outlined" size="large" href="#">Login</Button>
        <Button color="inherit" variant="contained" size="large" href="#">Sign Up</Button>
      </div>
    </div>
  )
}

export default Navbar;