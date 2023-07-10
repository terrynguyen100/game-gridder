import { createContext, useState } from "react";

export const RouteContext = createContext();

const RouteProvider = (props) => {
  const [route, setRoute] = useState('/');

  const changeRoute = (newRoute) => {
    console.log("Hello!");
    setRoute(newRoute);
    console.log(route);
  };

  const value = { route, changeRoute };

  return (
    <RouteContext.Provider value={value}>
      {props.children}
    </RouteContext.Provider>
  );
};

export default RouteProvider;