import { useContext, useEffect, useState } from "react";
import "./../../sass/createTournaments.scss";
import { RouteContext } from '../../providers/RouteProvider';
import CreateTournamentProvider from "../../providers/CreateTournamentProvider";
import LeftDrawer from "./LeftDrawer";

const CreateTournament = () => {
  const { changeRoute } = useContext(RouteContext);

  return (
    <CreateTournamentProvider>
      <LeftDrawer/>
    </CreateTournamentProvider>
  );
};

export default CreateTournament;

