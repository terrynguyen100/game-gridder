import { useEffect, useState } from "react";
import axios from 'axios';
import SearchBar from "./SearchBar";
import DropBox from "./DropBox";
import ImgCard from "./Card";
import ResetBox from "./ResetBox";
import { Box, Container } from "@mui/material";
import "./../../sass/tournaments.scss"

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filtered, setFiltered] = useState([])
  const [game, setGame] = useState('All')
  const [tournamentState, setTournamentState] = useState('All')
  const [registration, setRegistration] = useState('All')

  const gameArray = ['Mario Kart', 'Zelda: Tears of the Kingdom']
  const tournamentStateArray = ['Upcoming', 'Ongoing', 'Completed']
  const registrationArray = ['All', 'Free', 'Paid']

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const tournamentData = await axios.get("/tournaments")
    setTournaments(tournamentData.data)
  }


  const tournamentGameClick = (ev) => {
    setFiltered(tournaments);
    const textClicked = ev.target.innerHTML
    // const filteredTournaments = tournaments.filter(tournament => tournament.status === textClicked)
    // setTournaments(filteredTournaments)
    setGame(textClicked)
  }

  const tournamentStateClick = (ev) => {
    setFiltered(tournaments);
    const textClicked = ev.target.innerHTML
    const filteredTournaments = tournaments.filter(tournament => tournament.status === textClicked)
    setFiltered(filteredTournaments)
    setTournamentState(textClicked)
  }

  const tournamentRegistrationClick = (ev) => {
    setFiltered(tournaments);
    const textClicked = ev.target.innerHTML
    // const filteredTournaments = tournaments.filter(tournament => tournament.status === textClicked)
    // setTournaments(filteredTournaments)
    setRegistration(textClicked)
  }

  const resetFiltersClick = () => {
    setFiltered([])
    setGame('All')
    setTournamentState('All')
    setRegistration('All')
  }

  return(
    <Container maxWidth="lg">
      <h1 id="t-title">Tournaments</h1>
      <div id="search-filters">
        <div id="search">
          <SearchBar />
        </div>
        <div id="filters">
          <Box className="filter-box" sx={{display: { xs: 'none', md: 'flex' }}}>
            <DropBox title="GAME" filter={game} dropDownItems={gameArray} handleClick={tournamentGameClick}/>
          </Box>
          <Box className="filter-box" sx={{display: { xs: 'none', md: 'flex' }}}>
            <DropBox title="STATE" filter={tournamentState} dropDownItems={tournamentStateArray} handleClick={tournamentStateClick}/>
          </Box>
          <Box className="filter-box" sx={{display: { xs: 'none', md: 'flex' }}}>
            <DropBox title="REGISTRATION" filter={registration} dropDownItems={registrationArray} handleClick={tournamentRegistrationClick}/>
          </Box>
          {filtered.length > 0 &&          
            <div className="filter-box">
              <ResetBox title="CLEAR FILTERS" handleClick={resetFiltersClick}/>
            </div>
          }
        </div>
      </div>
      <Container id="card-container" maxWidth="lg">
        {
        filtered.length ? 
        filtered.map(tournament => {
          return <ImgCard tournament={tournament} key={tournament.id} />
        })
        :tournaments.map(tournament => {
          return <ImgCard tournament={tournament} key={tournament.id} />
        })}
      </Container>
    </Container>
  )

}

export default Tournaments;