import { useContext, useEffect } from "react";
import { Button, Select, MenuItem, InputLabel, FormControl, Box, Typography } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

import UserSearchField from './UserSearchField';
import { ErrorContext } from "../../providers/ErrorProvider";
import { useNavigate } from 'react-router-dom';
import PlayerCardList from "./smallComponents/PlayerCardList";

export default function ParticipantsTab(props) {
  const navigate = useNavigate();
  const {
    tourName,
    tourDate,
    tourGameName,
    tourCategory,
    tourDescription,
    tourParticipants, setTourParticipants,
    tourMatches,
    tourPlayerNum, setTourPlayerNum,
  } = useContext(CreateTournamentContext);

  const { userId } = useContext(AuthContext);

  const { displayError } = useContext(ErrorContext);

  const spacingItems = 1;
  const numberOfParticipantsOptions = [4, 8, 16, 32]

  const addTourParticipant = (playerName) => {
    const trimmedPlayerName = playerName.trim();
    if (trimmedPlayerName === '') {
      return displayError('Need a player name');
    }
    if (tourParticipants.includes(trimmedPlayerName)) {
      return displayError('This player name already added');
    }
    // Add new participant to the tourParticipants array
    setTourParticipants([...tourParticipants, playerName]);
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
    // Validation for logged in user
    if (userId === null) {
      props.setTabIndex(0);
      navigate(`/login`);
      return displayError('Need to log in for tournament creation');
    }

    // Validation for any fields from Tournament Tab
    if (tourName === '') {
      props.setTabIndex(0);
      return displayError('Need a name for the tournament');
    }
    if (tourCategory === '') {
      props.setTabIndex(0);
      return displayError('Need to choose a category');
    }

    // Validation for any fields from Participants Tab
    if (tourParticipants.length < tourPlayerNum) {
      props.setTabIndex(1);
      return displayError('Need more participants');
    }


    const requestBody = {
      "organizer_id": userId, //change to current user from AuthProvider
      "category_id": tourCategory,
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
        navigate(`/tournaments/${response.data.id}`);
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
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // If the participant is dropped outside a Droppable, do nothing
    }

    const newParticipants = Array.from(tourParticipants);
    const [reorderedParticipant] = newParticipants.splice(result.source.index, 1);
    newParticipants.splice(result.destination.index, 0, reorderedParticipant);

    setTourParticipants(newParticipants);
  };

  const handleShuffle = () => {
    const shuffledParticipants = [...tourParticipants];
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
    }
    setTourParticipants(shuffledParticipants);
  };

  return (
    <Box sx={{
      marginLeft: 2,
      marginRight: 2,
      marginTop: 12,
      width: '230px',
    }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }} color="primary">Players Info</Typography>
      <FormControl fullWidth sx={{ marginBottom: spacingItems }}>
        <InputLabel id="type-select-label">Number of Players</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={tourPlayerNum}
          label="Number of Players"
          onChange={(event) => { onChangePlayerNum(event.target.value) }}
          sx={{textAlign: "center" }}
        >
          <MenuItem disabled value='0'></MenuItem>
          {numberOfParticipantsOptions.map((option, index) => {
            return <MenuItem key={index} value={option}>{option}</MenuItem>
          })}
        </Select>
      </FormControl>

      <UserSearchField
        addTourParticipant={addTourParticipant}
      ></UserSearchField>
      <Typography variant="caption" sx={{ }}>Type @ to add a user.</Typography>

      <PlayerCardList
        tourParticipants={tourParticipants}
        handleIconDelete={handleIconDelete}
        handleDragEnd={handleDragEnd}
        spacingItems={spacingItems}
        handleShuffle={handleShuffle}
      />

      <Button
        variant="contained"
        sx={{ width: '100%', bgcolor: 'primary.main' }}
        onClick={handleButtonGenerate}
      >Create Tournament</Button>
    </Box>
  );
};