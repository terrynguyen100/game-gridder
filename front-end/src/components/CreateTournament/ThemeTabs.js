import { useContext, useEffect, useState } from "react";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, styled, Paper, Typography, Card, IconButton, Divider, Container, Autocomplete } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import UserSearchField from './UserSearchField';
import { ErrorContext } from "../../providers/ErrorProvider";

const ThemesTab = () => {
  // const [participantName, setParticipantName] = useState('');
  // const [participantsList, setParticipantList] = useState('');
  // const {
  //   tourName, setTourName,
  //   tourDate, setTourDate,
  //   tourGameName, setTourGameName,
  //   tourDescription, setTourDescription,
  //   tourParticipants, setTourParticipants,
  //   tourMatches, setTourMatches,
  //   tourPlayerNum, setTourPlayerNum,
  // } = useContext(CreateTournamentContext);
  // const { displayError } = useContext(ErrorContext);

  // const spacingItems = 1;
  

  return (
    <Box sx={{
      marginLeft: 2,
      marginRight: 2,
      marginTop: 12,
      textAlign: 'center',
      width: '230px',

    }}
    >
      
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Theme</Typography>  
    </Box>
  );
};

export default ThemesTab;
