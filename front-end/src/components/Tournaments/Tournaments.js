import { useEffect, useState } from "react";
import axios from 'axios';
import SearchBar from "./SearchBar";
import DropBox from "./DropBox";
import ImgCard from "./Card";
import ResetBox from "./ResetBox";
import { Box, Container, Typography } from "@mui/material";
import "./../../sass/tournaments.scss";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [game, setGame] = useState('All');
  const [tournamentState, setTournamentState] = useState('All');
  const [registration, setRegistration] = useState('All');
  const [gameArray, setGameArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const tournamentStateArray = ['Upcoming', 'Ongoing', 'Completed'];
  // const registrationArray = ['All', 'Free', 'Paid'];

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/tournaments")
      .then((response) => {
        const tournamentArray = response.data;
        setTournaments(tournamentArray);
        const gameList = [];
        for (let tournament of tournamentArray) {
          if (!(gameList.includes(tournament.game_name))) {
            gameList.push(tournament.game_name);
          }
        }
        setGameArray(gameList.sort());
      });
  };

  const tournamentGameClick = (ev) => {
    setFiltered(tournaments);
    const textClicked = ev.target.innerHTML;
    const filteredTournaments = tournaments.filter(tournament => tournament.game_name === textClicked);
    setFiltered(filteredTournaments);
    setActiveFilter(true);
    setGame(textClicked);
  };

  const tournamentStateClick = (ev) => {
    setFiltered(tournaments);
    const textClicked = ev.target.innerHTML;
    const filteredTournaments = tournaments.filter(tournament => tournament.status === textClicked);
    setFiltered(filteredTournaments);
    setActiveFilter(true);
    setTournamentState(textClicked);
  };

  // const tournamentRegistrationClick = (ev) => {
  //   setFiltered(tournaments);
  //   const textClicked = ev.target.innerHTML;
  //   const filteredTournaments = tournaments.filter(tournament => tournament.status === textClicked)
  //   setTournaments(filteredTournaments)
  //   setActiveFilter(true);
  //   setRegistration(textClicked);
  // };

  const resetFiltersClick = () => {
    setFiltered([]);
    setActiveFilter(false);
    setGame('All');
    setTournamentState('All');
    setRegistration('All');
    setSearchTerm('');
  };

  return (
    <Container maxWidth="lg">
      <h1 id="t-title">Tournaments</h1>
      <div id="search-filters">
        <div id="search">
          <SearchBar tournaments={tournaments} filtered={filtered} setFiltered={setFiltered} setActiveFilter={setActiveFilter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} game={game} tournamentState={tournamentState} registration={registration}/>
        </div>
        <div id="filters">
          <Box className="filter-box" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <DropBox title="GAME" filter={game} dropDownItems={gameArray} handleClick={tournamentGameClick} />
          </Box>
          <Box className="filter-box" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <DropBox title="STATUS" filter={tournamentState} dropDownItems={tournamentStateArray} handleClick={tournamentStateClick} />
          </Box>
          {/* <Box className="filter-box" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <DropBox title="REGISTRATION" filter={registration} dropDownItems={registrationArray} handleClick={tournamentRegistrationClick} />
          </Box> */}
          {activeFilter &&
            <div className="filter-box">
              <ResetBox title="CLEAR FILTERS" handleClick={resetFiltersClick} />
            </div>
          }
        </div>
      </div>
      <Container id="card-container" maxWidth="lg">
        {!activeFilter ? 
            tournaments.map(tournament => {
              return <ImgCard tournament={tournament} key={tournament.id} />;
            }) : filtered.length ? filtered.map(tournament => {
              return <ImgCard tournament={tournament} key={tournament.id} />}) : <Typography sx={{textAlign: 'center', mt: '4rem', fontSize: '1.25rem'}}>No matches found</Typography>}
      </Container>
    </Container>
  );
};

export default Tournaments;