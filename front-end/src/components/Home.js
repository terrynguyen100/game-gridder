import Button from "@mui/material/Button";
import '../sass/home.scss';
import { RouteContext } from '../providers/RouteProvider';
import { useContext } from "react";

const Home = () => {
  const { changeRoute } = useContext(RouteContext);

  return (
    <div className="home">
      <Button onClick={() => changeRoute('/tournaments/create')} id="create-btn" size="large">Create a Tournament</Button>
      <h2>Make a tournament for sports, games, and more!</h2>
      <Button href="/tournaments" id="find-btn" size="large">Find a Tournament</Button>
    </div>
  )
}

export default Home;