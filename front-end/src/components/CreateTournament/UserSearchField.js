import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";

export default function UserSearchField(props) {
  const [userTags, setUserTags] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const {usersIds, setUsersIds} = React.useContext(CreateTournamentContext);

  const fetchUsers = async () => {
    // requires revision to get only the user names and not the complete users
    const usersData = await axios.get("/users");
    const userTags = usersData.data.reduce((acc, obj) => {
      if (obj.hasOwnProperty('user_name')) {
        const { id, user_name } = obj;
        // fill the userNames array with the user tags
        acc.push('@' + user_name);
        // fill the usersIds object with the user ids key value pairs
        setUsersIds(prevState => ({ ...prevState, [user_name]: id }));
      }
      return acc;
    }, []);
    setUserTags(userTags);
    
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  React.useEffect(() => {
    if (inputValue?.startsWith('@')) {
      setOptions(userTags);
    }
    else {
      setOptions([]);
    }
  }, [inputValue]);


  const handleEnter = (paramsInput) => {
    const isExisted = userTags.includes(paramsInput);
    if (paramsInput.startsWith('@') && isExisted) {
      props.addTourParticipant(paramsInput);
    } 
    else if (!paramsInput.startsWith('@') && paramsInput === inputValue) {
      props.addTourParticipant(paramsInput);
    }

    setInputValue('');
  };

  return (
    <Autocomplete
      sx={{ width: '100%', marginBottom: 1 }}
      selectOnFocus={true}
      clearOnBlur={true}
      freeSolo={true}
      id="free-solo-2-demo"
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

      renderInput={(params) => (
        <TextField
          {...params}
          label="Add Participant"
          placeholder='Type @ to search for a user'
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleEnter(params.inputProps.value);
            }
          }
          }
        />
      )}
    />
  );
}

