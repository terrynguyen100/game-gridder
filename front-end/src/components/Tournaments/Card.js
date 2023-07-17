import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardPhoto from './CardPhoto';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CardActionArea } from '@mui/material';

export default function ImgCard({ tournament }) {
  const navigate = useNavigate();
  const [gamePlayed, setGamePlayed] = useState('');
  const [numOfPlayers, setNumOfPlayers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [tournamentInfo, setTournamentInfo] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const tournamentData = await axios.get(`/tournaments/${tournament.id}`);
    setTournamentInfo(tournamentData.data);

    //Get number of players in a tournament
    if (tournamentData.data.matches.length === 0) setNumOfPlayers([].length);
    const getPlayerNums = tournamentData.data.matches.reduce((ac, cv) => {
      if (cv?.players.length === 0) return ac;
      if (!ac.includes(cv?.players[0]?.player_name) && cv?.players[0]?.player_name !== 'TBD') ac.push(cv?.players[0]?.player_name);
      if (!ac.includes(cv?.players[1]?.player_name) && cv?.players[1]?.player_name !== 'TBD') ac.push(cv?.players[1]?.player_name);
      return ac;
    }, []);
    setNumOfPlayers(getPlayerNums.length);

    //Get start date of tournament
    const startingDate = tournamentData.data.start_date.slice(0, 10);
    setStartDate(startingDate);

    //Get game being played
    setGamePlayed(tournamentData.data.game_name);
  };

  const handleRoute = () => {
    navigate(`/tournaments/${tournamentInfo.id}`);
  };

  return (
    <div>
      <CardActionArea onClick={() => handleRoute()}>
        <Card variant="outlined" sx={{ padding: '1rem', maxWidth: "20rem", height: '25rem', backgroundColor: "#2B303D", borderRadius: '10px' }}>
          <CardPhoto categoryID={tournament.category_id} />
          <CardContent>
            <Typography gutterBottom color="secondary" variant="h5" component="h3" textAlign={'center'}>
              {tournament.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tournament.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <VideogameAssetIcon sx={{ mr: 1.5 }} />
              <span>{gamePlayed}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <PersonIcon sx={{ mr: 1.5 }} />
              <span>{numOfPlayers}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <CalendarMonthIcon sx={{ mr: 1.5 }} />
              <span>{startDate}</span>
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
}