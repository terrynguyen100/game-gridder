import { createContext, useState } from "react";

export const CreateTournamentContext = createContext();

const CreateTournamentProvider = (props) => {

  const [tourName, setTourName] = useState('');
  const [tourType, setTourType] = useState('');
  const [tourCategory, setTourCategory] = useState('');
  const [tourGameName, setTourGameName] = useState('');
  const [tourDate, setTourDate] = useState(null);
  const [tourDescription, setTourDescription] = useState('');
  const [tourParticipants, setTourParticipants] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [tourMatches, setTourMatches] = useState([]);

  const value = {
    tourName, setTourName,
    tourType, setTourType,
    tourCategory, setTourCategory,
    tourGameName, setTourGameName,
    tourDescription, setTourDescription,
    tourDate, setTourDate,
    tourParticipants, setTourParticipants,
    categories, setCategories,
    tourMatches, setTourMatches,
  };

  return (
    <CreateTournamentContext.Provider value={value}>
      {props.children}
    </CreateTournamentContext.Provider>
  );
};

export default CreateTournamentProvider;