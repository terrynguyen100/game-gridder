import { createContext, useState } from "react";

export const CreateTournamentContext = createContext();

const CreateTournamentProvider = (props) => {

  const [tourName, setTourName] = useState('');
  const [tourType, setTourType] = useState('');
  const [tourCategory, setTourCategory] = useState('');
  const [tourDate, setTourDate] = useState(null);
  const [tourDescription, setTourDescription] = useState('');
  const [categories, setCategories] = useState([]);

  const value = {
    tourName, setTourName,
    tourType, setTourType,
    tourCategory, setTourCategory,
    tourDescription, setTourDescription,
    tourDate, setTourDate,
    categories, setCategories,
  };

  return (
    <CreateTournamentContext.Provider value={value}>
      {props.children}
    </CreateTournamentContext.Provider>
  );
};

export default CreateTournamentProvider;