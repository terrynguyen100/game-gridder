import { useContext, useEffect, useState } from "react";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, styled, Paper, Typography, Card, IconButton, Divider, Container, Autocomplete } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import UserSearchField from './UserSearchField';
import { ErrorContext } from "../../providers/ErrorProvider";

const ParticipantsTab = (props) => {
  const [participantName, setParticipantName] = useState('');
  const [participantsList, setParticipantList] = useState('');
  const {
    tourName, setTourName,
    tourDate, setTourDate,
    tourGameName, setTourGameName,
    tourDescription, setTourDescription,
    tourParticipants, setTourParticipants,
    tourMatches, setTourMatches,
    tourPlayerNum, setTourPlayerNum,
  } = useContext(CreateTournamentContext);
  const { displayError } = useContext(ErrorContext);

  const spacingItems = 1;
  const numberOfParticipantsOptions = [4, 8, 16, 32]

  const addTourParticipant = (playerName) => {
    const trimmedPlayerName = playerName.trim();
    if (trimmedPlayerName !== '') {
      // Add new participant to the tourParticipants array
      setTourParticipants([...tourParticipants, playerName]);
      setParticipantName('');
    }
  };

  const formatDateOfBirth = (dateOfBirth) => {
    if (dateOfBirth !== null) {
      let day = dateOfBirth.$D;
      let month = dateOfBirth.$M + 1;
      let year = dateOfBirth.$y;

      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;

      return `${year}-${month}-${day}`;
    }
    return null;
  };

  useEffect(() => {
    setParticipantList(tourParticipants.join('\n'));
    // To make the number of participants (in the dropdown) is always greater than the number of participants in the tournament 
    // while being among the options 4, 8, 16, 32
    if (tourParticipants.length > tourPlayerNum) {
      if (tourPlayerNum === 0) {
        setTourPlayerNum(numberOfParticipantsOptions[0]);
      }
      for (let i = 0; i < numberOfParticipantsOptions.length; i++) {
        if (tourParticipants.length > numberOfParticipantsOptions[i]) {
          setTourPlayerNum(numberOfParticipantsOptions[i + 1]);
        }
      }
    }
  }, [tourParticipants]);

  const handleButtonGenerate = () => {

    // Validation for any fields from Tournament Tab
    if (tourName === '') {
      props.setTabIndex(0);
      return displayError('Need a name for the tournament');
    }
    // if (tourCategory === '') {
    //   props.setTabIndex(0);
    //   return displayError('Need a name for the tournament');
    // }

    // Validation for any fields from Participants Tab
    if (tourParticipants.length < tourPlayerNum) {
      props.setTabIndex(1);
      return displayError('Need more participants');
    }

    const requestBody = {
      "organizer_id": 1, //change to current user from AuthProvider
      "category_id": 1,
      "name": tourName,
      "start_date": formatDateOfBirth(tourDate),
      "status": "created",
      "game_name": tourGameName,
      "description": tourDescription,
      "private": false,
      "matches": tourMatches
    };
    axios.post('/tournaments/create', requestBody)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });

  };
  const handleIconDelete = (index) => {
    const updatedParticipants = [...tourParticipants];
    updatedParticipants.splice(index, 1);
    setTourParticipants(updatedParticipants);
  };

  const onChangePlayerNum = (newPlayerNum) => {
    if (newPlayerNum < tourParticipants.length) {
      displayError('There are too many players.');
    } else {
      setTourPlayerNum(newPlayerNum);

    }
  };

  return (
    <Box sx={{
      marginLeft: 2,
      marginRight: 2,
      marginTop: 12,
      textAlign: 'center',
      width: '230px',

    }}
    >
      <FormControl fullWidth sx={{ marginBottom: spacingItems }}>
        <InputLabel id="type-select-label">Number of Players</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={tourPlayerNum}
          label="Number of Players"
          onChange={(event) => { onChangePlayerNum(event.target.value) }}
        >
          {numberOfParticipantsOptions.map((option, index) => {
            return <MenuItem key={index} value={option}>{option}</MenuItem>
          })}

        </Select>
      </FormControl>

      <UserSearchField
        addTourParticipant={addTourParticipant}
      ></UserSearchField>

      <Box sx={{
        padding: '10px',
        border: '1px solid black',
        borderRadius: 2,
        marginBottom: spacingItems,

        // height: `${tourPlayerNum* 45+ 80}px`,
        maxHeight: '54vh',
        overflow: 'auto',
        bgcolor: '#2B2D42'
      }}>
        <Typography variant="h6" sx={{ marginBottom: 1, color: "white" }}>Players</Typography>
        <Divider color="#EDF2F4" sx={{ marginBottom: 1 }}></Divider>
        {tourParticipants.map((participant, index) => {
          return <Card
            variant="outlined"
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px", bgcolor: "#EDF2F4" }}
            key={index}
          >
            <Typography variant="h6"
              sx={{ marginLeft: 1 }}
            > {index + 1} </Typography>

            <Typography variant="body1"> {participant} </Typography>
            <IconButton sx={{ color: '#BB0C05' }} onClick={() => handleIconDelete(index)}>
              < ClearIcon fontSize="small" sx={{ color: '#BB0C05' }} />
            </IconButton>
          </Card>
        })}

      </Box>

      {/* <Button
        variant="contained"
        sx={{
          width: '100%',
          bgcolor: '#BB0C05',
          marginBottom: spacingItems
        }}
        onClick={props.handleButtonNext}
      >Next</Button> */}

      <Button
        variant="contained"
        sx={{
          width: '100%',
          bgcolor: '#BB0C05'
        }}
        onClick={handleButtonGenerate}
      >Create Tournament</Button>
    </Box>
  );
};

export default ParticipantsTab;
