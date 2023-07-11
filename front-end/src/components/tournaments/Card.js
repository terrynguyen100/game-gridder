import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import joypad from './../../images/joypad.svg'
import cards from './../../images/cards.png'
import { RouteContext } from '../../providers/RouteProvider';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios'

export default function ImgCard({ tournament, handleRoute }) {
  const { changeRoute } = useContext(RouteContext);
  const [numOfPlayers, setNumOfPlayers] = useState([])
  const [startDate, setStartDate] = useState('')
  const [cardImage, setCardImage] = useState('')
  const [tournamentInfo, setTournamentInfo] = useState([])

  useEffect(() => {
    getData()
    // getCategory()
  }, [])

  const getData = async() => {
    const tournamentData = await axios.get(`tournaments/${tournament.id}`)
    setTournamentInfo(tournamentData.data)

    //Get number of players in a tournament
    if(tournamentData.data.matches.length === 0) setNumOfPlayers([].length)
    const getPlayerNums = tournamentData.data.matches.reduce((ac, cv) => {
      if(cv.players.length === 0) return ac
      if(!ac.includes(cv.players[0].player_name)) ac.push(cv.players[0].player_name)
      if(!ac.includes(cv.players[1].player_name)) ac.push(cv.players[1].player_name)
      return ac
    }, [])
    setNumOfPlayers(getPlayerNums.length);

    //Get start date of tournament
    const startingDate = tournamentData.data.start_date.slice(0, 10)
    setStartDate(startingDate)

    //Get category & set background image
    // const category = tournamentData.data
  }

  // const getCategory = async() => {
  //   const tournamentCategory = await axios.get(`tournaments/category`)
  //   console.log(tournamentCategory)
  // }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#2B303D", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardMedia
        component="img"
        alt="game controller"
        height="140"
        image={joypad}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tournament.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tournament.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", mt: 0.5}}>
          <VideogameAssetIcon sx={{mr: 1.5}}/> 
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", mt: 0.5}}>
          <PersonIcon sx={{mr: 1.5}}/> 
          <span>{numOfPlayers}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", mt: 0.5}}>
          <CalendarMonthIcon sx={{mr: 1.5}}/> 
          <span>{startDate}</span>
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center"}}>
        <Button onClick={() => handleRoute({tournamentInfo, numOfPlayers})} sx={{ backgroundColor: "#454d60", width: "90%", color: "#FFF", boxShadow: "0 1px 1px 0 rgba(0,0,0,0.3)" }} size="large">View</Button>
      </CardActions>
    </Card>
  );
}