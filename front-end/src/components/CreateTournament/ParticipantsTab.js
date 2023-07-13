import { useContext, useEffect, useState } from "react";
import { RouteContext } from '../../providers/RouteProvider';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, styled, Paper, Typography, Card, IconButton, Divider, Container, Autocomplete } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import UserSearchField from './UserSearchField';

const ParticipantsTab = (props) => {
  const [participantName, setParticipantName] = useState('');
  const [participantsList, setParticipantList] = useState('');
  const [participantsNumber, setParticipantsNumber] = useState('');
  const {
    tourName, setTourName,
    tourGameName, setTourGameName,
    tourDescription, setTourDescription,
    tourParticipants, setTourParticipants,
    tourMatches, setTourMatches,
  } = useContext(CreateTournamentContext);

  const spacingItems = 2;

  const top100Films = [
    { label: '@he Shawshank Redemption', year: 1994 },
    { label: '@The Godfather', year: 1972 },
    { label: '@The Godfather: Part II', year: 1974 },
    { label: '@The Dark Knight', year: 2008 },
    { label: '@12 Angry Men', year: 1957 },
    { label: "@Schindler's List", year: 1993 },
    { label: '@Pulp Fiction', year: 1994 }]

  const addTourParticipant = (playerName) => {
    if (playerName !== '') {
      // Add new participant to the tourParticipants array
      setTourParticipants([...tourParticipants, playerName]);
      setParticipantName('');
    }
  };

  useEffect(() => {
    setParticipantList(tourParticipants.join('\n'));
  }, [tourParticipants]);

  const handleButtonGenerate = () => {

    const requestBody = {
      "organizer_id": 1,
      "category_id": 1,
      "name": tourName,
      "start_date": "2023-07-15T06:00:00.000Z",
      "status": "created",
      "game_name": "Poker",
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

  const handleNewParticipantOnChange = (event) => {
    setParticipantName(event.target.value);

  };

  return (
    <Box sx={{
      marginLeft: 2,
      marginRight: 2,
      marginTop: 12,
      textAlign: 'center',

    }}
    >
      {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <TextField
        label="Enter a Partcipant Name"
        value={participantName}
        sx={{ width: '100%', marginBottom: spacingItems }}
        onChange={(event) => { handleNewParticipantOnChange(event) }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addTourParticipant();
          }
        }}
      /> */}

        <TextField
          label="Enter a Participant Name"
          value={participantName}
          sx={{ width: '100%', marginBottom: spacingItems }}
          onChange={(event) => {
            handleNewParticipantOnChange(event);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addTourParticipant(participantName);
            }
          }}
        />

      <UserSearchField
        addTourParticipant ={addTourParticipant}
      />

      <FormControl fullWidth sx={{ marginBottom: spacingItems }}>
        <InputLabel id="type-select-label">Number of Partcipants</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={participantsNumber}
          label="Number of Participants"
          onChange={(event) => { setParticipantsNumber(event.target.value) }}
        >
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'8'}>8</MenuItem>
          <MenuItem value={'16'}>16</MenuItem>
          <MenuItem value={'32'}>32</MenuItem>

        </Select>
      </FormControl>
      {/* -------------------------------------------------------- */}
      <Box sx={{ padding: '15px', border: '1px solid black', borderRadius: 2, marginBottom: spacingItems }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>Participants</Typography>
        <Divider></Divider>
        {tourParticipants.map((participant, index) => {
          return <Card
            variant="outlined"
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 1, bgcolor: "#8D99AE" }}
            key={index}
          >
            <Typography variant="h6"
              sx={{ marginLeft: 1 }}
            > {index + 1} </Typography>

            <Typography variant="h7"> {participant} </Typography>
            <IconButton sx={{ color: '#BB0C05' }} onClick={() => handleIconDelete(index)}>
              < ClearIcon fontSize="small" sx={{ color: '#BB0C05' }} />
            </IconButton>
          </Card>
        })}
      </Box>

      {/* <TextField
        id="outlined-multiline-static"
        label="Participants"
        value={participantsList}
        multiline
        rows={8}
        sx={{ width: '100%', marginBottom: spacingItems }}
      /> */}


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
