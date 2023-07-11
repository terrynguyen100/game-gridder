import { createContext, useState } from "react";

export const ErrorContext = createContext();

export default function ErrorProvider(props) {
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const displayError = (message) => {
    setError(message);
    setOpen(true);
  }

  const hideError = () => {
    setError('');
    setOpen(false);
  }
  
  const value = { error, open, displayError, hideError };

  return (
    <ErrorContext.Provider value={value}>
      {props.children}
    </ErrorContext.Provider>
  );
};