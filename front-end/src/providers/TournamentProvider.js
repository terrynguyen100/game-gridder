import { createContext, useState } from "react";

export const TournamentContext = createContext();

export default function TournamentProvider(props) {
  const [t, setT] = useState({})

  const value = { t, setT };

  return (
    <TournamentContext.Provider value={value}>
      {props.children}
    </TournamentContext.Provider>
  );
};