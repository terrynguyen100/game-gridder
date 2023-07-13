import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

export default function UserSearchField (props) {
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState(null);
  const fetchUsers = async () => {
    const usersData = await axios.get("/users");
    const userNames = usersData.data.reduce((acc, obj) => {
      if (obj.hasOwnProperty('user_name')) {
        acc.push('@' + obj.user_name);
      }
      return acc;
    }, []);

    setOptions(userNames);
  };

  React.useEffect(() => {

    fetchUsers();
  }, []);

  const handleEnter = (newParticipant) => {
    const IsExisted = options.includes(newParticipant);
    

    if (!newParticipant.startsWith('@')) {
      props.addTourParticipant(newParticipant);
    } else if (IsExisted) {
      props.addTourParticipant(newParticipant);
    }
    setInputValue('');
  };
  

  return (

    <Autocomplete
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
      value={inputValue}
      onInputChange={(newInputValue) => {
        setInputValue(newInputValue);
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

