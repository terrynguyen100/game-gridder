import { useContext, useEffect, useState } from "react";
import { RouteContext } from '../../providers/RouteProvider';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, styled } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import axios from "axios";


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

  const addTourParticipant = () => {
    if (participantName !== '') {
      // Add new participant to the tourParticipants array
      setTourParticipants([...tourParticipants, participantName]);
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
  return (
    <Box sx={{
      marginLeft: 2,
      marginRight: 2,
      marginTop: 12,
      textAlign: 'center',

    }}
    >
      <TextField
        label="Enter a Partcipant Name"
        value={participantName}
        sx={{ width: '100%', marginBottom: spacingItems }}
        onChange={(event) => { setParticipantName(event.target.value) }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addTourParticipant();
          }
        }}
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
      <TextField
        id="outlined-multiline-static"
        label="Participants"
        value={participantsList}
        multiline
        rows={8}
        sx={{ width: '100%', marginBottom: spacingItems }}
      />


      <Button
        variant="contained"
        sx={{
          width: '100%',
          bgcolor: '#BB0C05',
          marginBottom: spacingItems
        }}
        onClick={props.handleButtonNext}
      >Next</Button>

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
