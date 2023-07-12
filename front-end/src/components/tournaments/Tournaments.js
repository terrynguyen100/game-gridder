import SearchBar from "./SearchBar";
import DropBox from "./DropBox";
import ImgCard from "./Card";
import { useEffect, useState } from "react";
import axios from 'axios';

import "./../../sass/tournaments.scss"
import ResetBox from "./ResetBox";

const Tournaments = ({ handleRoute }) => {
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
    const tournamentData = await axios.get("tournaments/")
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
    <>
      <h1 id="t-title">Tournaments</h1>
      <div id="search-filters">
        <div id="search">
          <SearchBar />
        </div>
        <div id="filters">
          <div className="filter-box">
            <DropBox title="GAME" filter={game} dropDownItems={gameArray} handleClick={tournamentGameClick}/>
          </div>
          <div className="filter-box">
            <DropBox title="STATE" filter={tournamentState} dropDownItems={tournamentStateArray} handleClick={tournamentStateClick}/>
          </div>
          <div className="filter-box">
            <DropBox title="REGISTRATION" filter={registration} dropDownItems={registrationArray} handleClick={tournamentRegistrationClick}/>
          </div>
          {filtered.length > 0 &&          
            <div className="filter-box">
              <ResetBox title="CLEAR FILTERS" handleClick={resetFiltersClick}/>
            </div>
          }
        </div>
      </div>
      <div id="card-container">
        {
        filtered.length ? 
        filtered.map(tournament => {
          return <ImgCard tournament={tournament} key={tournament.id} handleRoute={handleRoute}/>
        })
        :tournaments.map(tournament => {
          return <ImgCard tournament={tournament} key={tournament.id} handleRoute={handleRoute}/>
        })}
      </div>
    </>
  )

}

export default Tournaments;