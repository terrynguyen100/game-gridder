import { createContext, useState } from "react";

export const CreateTournamentContext = createContext();

const CreateTournamentProvider = (props) => {

  const [tourName, setTourName] = useState('');
  const [tourType, setTourType] = useState('');
  const [tourCategory, setTourCategory] = useState('');
  const [tourGameName, setTourGameName] = useState('');
  const [tourDate, setTourDate] = useState(null);
  const [tourDescription, setTourDescription] = useState('A tournament created by a very cool person');
  const [tourParticipants, setTourParticipants] = useState([]);
  const [tourPlayerNum, setTourPlayerNum] = useState(0)
  const [categories, setCategories] = useState([]);
  
  const [tourMatches, setTourMatches] = useState([]);
  const [usersIds, setUsersIds] = useState({}); //storeing the key is user_name, value is id

  const value = {
    tourName, setTourName,
    tourType, setTourType,
    tourCategory, setTourCategory,
    tourGameName, setTourGameName,
    tourDescription, setTourDescription,
    tourDate, setTourDate,
    tourParticipants, setTourParticipants,
    tourPlayerNum, setTourPlayerNum,
    categories, setCategories,
    tourMatches, setTourMatches,
    usersIds, setUsersIds,
  };

  return (
    <CreateTournamentContext.Provider value={value}>
      {props.children}
    </CreateTournamentContext.Provider>
  );
};

export default CreateTournamentProvider;