import SearchBar from "./SearchBar";
import DropBox from "./DropBox";
import ImgCard from "./Card";
import { useEffect, useState } from "react";
import axios from 'axios';

import "./../../sass/tournaments.scss"

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [game, setGame] = useState('All')
  const [state, setState] = useState('All')
  const [registration, setRegistration] = useState('All')

  useEffect(() => {
    axios.get("tournaments/")
      .then(res => setTournaments(res.data))
      .catch(err => console.log(err.message))
  }, [])

  return(
    <>
      <h1 id="t-title">Tournaments</h1>
      <div id="search-filters">
        <div id="search">
          <SearchBar />
        </div>
        <div id="filters">
          <div className="filter-box">
            <DropBox title="GAME" filter={game}/>
          </div>
          <div className="filter-box">
            <DropBox title="STATE" filter={state}/>
          </div>
          <div className="filter-box">
            <DropBox title="REGISTRATION" filter={registration}/>
          </div>
        </div>
      </div>
      <div id="card-container">
        {tournaments.map(tournament => {
          return <ImgCard tournament={tournament} key={tournament.id}/>
        })}
      </div>
    </>
  )

}

export default Tournaments;