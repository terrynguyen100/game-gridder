import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import '../sass/home.scss';

const Home = () => {

  return (
    <div className="home">
      <Button component='p' id="create-btn" size="large">
        <Link to={"/tournaments/create"}>
          Create a Tournament
        </Link>
      </Button>
      <h2>Make a tournament for sports, games, and more!</h2>
      <Button component='p' id="find-btn" size="large">
        <Link to={"/tournaments/view"}>
          Find a Tournament
        </Link>
      </Button>
    </div>
  )
}

export default Home;