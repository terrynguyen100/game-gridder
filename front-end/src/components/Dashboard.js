import Button from "@mui/material/Button";
import ImgCard from "./Tournaments/Card";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../sass/dashboard.scss';
import ShareButtons from "./Tournaments/ShareButtons";
import { Container, Typography } from "@mui/material";

const Dashboard = () => {
  const { userId } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  
  useEffect(() => {
    axios.get(`/tournaments/users/${userId}`)
    .then((response) => {
      setTournaments(response.data);
    })
  }, [userId])

  return (
    <Container maxWidth="lg">
      <div className="dashboard">
      <h2>Welcome!</h2>
      <Button component='p' variant="contained" size="large" sx={{fontSize: "1.5rem"}}>
        <Link to={"/tournaments/create"}>
          Create a New Tournament
        </Link>
      </Button>
      <Typography variant="h4" color="secondary" mt="4rem">Your Tournaments</Typography>
      </div>
      <Container maxWidth="lg" className="tournament-cards">
      {tournaments.length > 0 && <div id="card-container">
        {tournaments.map((tournament) => {
          return (
          <div key={tournament.id}>
            <ImgCard tournament={tournament} key={tournament.id} />
            <ShareButtons tournament={tournament}/>
          </div>
          )
        })}
      </div>}
      </Container>
    </Container>
  )
}

export default Dashboard;