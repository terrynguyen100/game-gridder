import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';


let parsedUserNames = [];

export default function UserSearchField(props) {
  const [userNames, setUserNames] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');



  const fetchUsers = async () => {
    const usersData = await axios.get("/users");
    const userNames = usersData.data.reduce((acc, obj) => {
      if (obj.hasOwnProperty('user_name')) {
        acc.push('@' + obj.user_name);
      }
      return acc;
    }, []);
    setUserNames(userNames);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  React.useEffect(() => {
    if (inputValue?.startsWith('@')) {
      setOptions(userNames);
    }
    else {
      setOptions([]);
    }
  }, [inputValue]);


  const handleEnter = (newParticipant) => {
    const isExisted = userNames.includes(newParticipant);
    if (newParticipant.startsWith('@') && isExisted) {
      props.addTourParticipant(newParticipant);
    } else if (!newParticipant.startsWith('@') && newParticipant === inputValue) {
      props.addTourParticipant(newParticipant);
    }
    
    setInputValue('');
  };

  return (
    // edge case: user choose a @user and continue to type
    <Autocomplete
      sx={{ width: '100%', marginBottom: 2 }}
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

