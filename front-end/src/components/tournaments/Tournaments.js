import SearchBar from "./SearchBar";
import DropBox from "./DropBox";
import ImgCard from "./Card";
import { useEffect, useState } from "react";
import axios from 'axios';

import "./../../sass/tournaments.scss"

const Tournaments = ({ handleRoute }) => {
  const [tournaments, setTournaments] = useState([]);
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

  const tournamentClick = () => {

  }

  const tournamentGameClick = async (ev) => {
    await getData()
    const textClicked = ev.target.innerHTML
    // const filteredTournaments = tournaments.filter(tournament => tournament.status === textClicked)
    // setTournaments(filteredTournaments)
    setTournaments()
    setGame(textClicked)
  }


  const tournamentStateClick = async (ev) => {
    await getData()
    const textClicked = ev.target.innerHTML
    const filteredTournaments = tournaments.filter(tournament => tournament.status === textClicked)
    setTournaments(filteredTournaments)
    setTournamentState(textClicked)
  }

  const tournamentRegistrationClick = async (ev) => {
    await getData()
    const textClicked = ev.target.innerHTML
    // const filteredTournaments = tournaments.filter(tournament => tournament.status === textClicked)
    // setTournaments(filteredTournaments)
    setRegistration(textClicked)
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
        </div>
      </div>
      <div id="card-container">
        {tournaments.map(tournament => {
          return <ImgCard tournament={tournament} key={tournament.id} handleRoute={handleRoute}/>
        })}
      </div>
    </>
  )

}

export default Tournaments;