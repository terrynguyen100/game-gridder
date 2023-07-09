import Button from "@mui/material/Button";
import '../sass/home.scss';

const Home = () => {
  return (
    <div className="home">
      <Button id="create-btn" size="large">Create a Tournament</Button>
      <h2>Make a tournament for sports, games, and more!</h2>
      <Button id="find-btn" size="large">Find a Tournament</Button>
    </div>
  )
}

export default Home;