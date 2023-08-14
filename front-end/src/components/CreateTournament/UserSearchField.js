import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";

export default function UserSearchField(props) {
  // State variables for user tags, options, selected value, and input value
  const [userTags, setUserTags] = React.useState([]);
  const [options, setOptions] = React.useState([]); //Options are the user tags that are displayed in the dropdown
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  // Accessing the context from CreateTournamentProvider
  const { usersIds, setUsersIds } = React.useContext(CreateTournamentContext);

  // Fetches users from the server and sets user tags and context data
  const fetchUsers = async () => {
    try {
      const usersData = await axios.get("/users");
      const userTags = usersData.data.reduce((acc, obj) => {
        if (obj.hasOwnProperty("user_name")) {
          const { id, user_name } = obj;
          acc.push("@" + user_name);
          setUsersIds((prevState) => ({ ...prevState, [user_name]: id }));
        }
        return acc;
      }, []);
      setUserTags(userTags);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users when the component mounts
  React.useEffect(() => {
    fetchUsers();
  }, []);

  // Updates the options based on the input value
  React.useEffect(() => {
    if (inputValue?.startsWith('@')) {
      setOptions(userTags);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  // Handles the 'Enter' key press to add participants
  const handleEnter = (paramsInput) => {
    const isExisted = userTags.includes(paramsInput);
    if (paramsInput.startsWith('@') && isExisted) {
      props.addTourParticipant(paramsInput);
    } else if (!paramsInput.startsWith('@') && paramsInput === inputValue) {
      props.addTourParticipant(paramsInput);
    }

    setInputValue('');
  };

  return (
    // Autocomplete component for user search field
    <Autocomplete
      sx={{ width: '100%' }}
      selectOnFocus={true}
      clearOnBlur={true}
      freeSolo={true}
      disableClearable={true}
      autoComplete={true}
      autoHighlight={true}
      clearOnEscape={true}
      filterSelectedOptions={true}
      options={options}
      inputValue={inputValue}
      value={value}
      onInputChange={(event, newValue) => {
        setInputValue(newValue);
      }}

      // Renders the input field with specific properties
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add Player"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleEnter(params.inputProps.value);
            }
          }}
        />
      )}
    />
  );
}
