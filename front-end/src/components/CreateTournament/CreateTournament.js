import { useContext } from "react";
import "./../../sass/createTournaments.scss";
import { RouteContext } from '../../providers/RouteProvider';

const CreateTournament = () => {
  const { changeRoute } = useContext(RouteContext);

  return (
    <div className="create-tournament">
      <h1>Create Tournament</h1>
      <form>
        <div>
          <label htmlFor="tournamentName">Tournament Name:</label>
          <input type="text" id="tournamentName" name="tournamentName" />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTournament;
