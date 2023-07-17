import "./../../sass/createTournaments.scss";
import CreateTournamentProvider from "../../providers/CreateTournamentProvider";
import LeftDrawer from "./LeftDrawer";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect } from "react";

const CreateTournament = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId]);

  return (
    <CreateTournamentProvider>
      <LeftDrawer/>
    </CreateTournamentProvider>
  );
};

export default CreateTournament;

