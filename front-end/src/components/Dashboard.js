import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ImgCard from "./tournaments/Card";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../sass/dashboard.scss';

const Dashboard = () => {
  const { userId } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  
  useEffect(() => {
    axios.get(`/tournaments/users/${userId}`)
    .then((response) => {
      setTournaments(response.data);
    })
  }, [userId])

  if (tournaments.length > 0) {
  return (
    <div>
      <div className="dashboard">
      <h2>Welcome!</h2>
      <Button component='p' id="create-btn" size="large">
        <Link to={"/tournaments/create"}>
          Create a New Tournament
        </Link>
      </Button>
      </div>
      <div id="card-container">
        {tournaments.map((tournament) => {
          return <ImgCard tournament={tournament} key={tournament.id} />
        })}
      </div>
    </div>
  ) } else {
    return (
      <CircularProgress />
    )
  }

}

export default Dashboard;