import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function UserSearchField(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [autoCompleteValue, setAutoCompleteValue] = React.useState(false);

  const fetchUsers = async () => {
    const usersData = await axios.get("/users")
    const userNames = usersData.data.reduce((acc, obj) => {
      if (obj.hasOwnProperty('user_name')) {
        acc.push('@' + obj.user_name);
      }
      return acc;
    }, []);

    setOptions(userNames)
  }


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        fetchUsers();
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);


  const clearAutoComplete = () => {
    setAutoCompleteValue(true);
  }


  return (
    <Autocomplete
      key={autoCompleteValue} // this is the key to re-render the component
      id="asynchronous"
      open={open}
      sx={{ width: '100%', marginBottom: 2 }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter a @UserName"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (open === false) {
                console.log(params.inputProps);
                props.addTourParticipant(params.inputProps.value);
                clearAutoComplete();
              }
            }
          }}
        />
      )}
    />
  );
}
