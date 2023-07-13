import "./../../sass/createTournaments.scss";
import CreateTournamentProvider from "../../providers/CreateTournamentProvider";
import LeftDrawer from "./LeftDrawer";

const CreateTournament = () => {
  return (
    <CreateTournamentProvider>
      <LeftDrawer/>
    </CreateTournamentProvider>
  );
};

export default CreateTournament;

