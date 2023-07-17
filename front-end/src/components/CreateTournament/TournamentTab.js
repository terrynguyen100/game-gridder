import { useContext, useEffect } from "react";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, Typography } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import { DatePicker } from "@mui/x-date-pickers";
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";
import dayjs from 'dayjs';

const TournamentTab = (props) => {
  const {
    tourName, setTourName,
    tourType, setTourType,
    tourCategory, setTourCategory,
    tourGameName, setTourGameName,
    tourDescription, setTourDescription,
    tourDate, setTourDate,
    categories, setCategories,
  } = useContext(CreateTournamentContext);

  const spacingItems = 1;
  const fetchCategories = async () => {
    try {
      const categoriesData = await axios.get("/categories");
      setCategories(categoriesData.data);
    } catch (error) {
      // Handle the error
      console.error("Error fetching categories:", error);
      // Display an error message to the user or perform any other error handling logic
    }
  };

  useEffect(() => {
    fetchCategories();
    setTourDate(dayjs());
  }, []);


  return (
    <Box sx={{
      marginLeft: 2,
      marginRight: 2,
      marginTop: 12,
      width: '230px',
    }}
    >
      <TextField
        label="Tournament Name"
        value={tourName}
        sx={{ width: '100%', marginBottom: spacingItems }}
        onChange={(event) => { setTourName(event.target.value) }}

      />

      <FormControl fullWidth sx={{ marginBottom: spacingItems }}>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={tourType}
          label="Type"
          onChange={(event) => { setTourType(event.target.value) }}
        >
          <MenuItem value={'singleElemination'} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Single Elimination</Typography>
          </MenuItem>
          <MenuItem disabled value={'doubleElemination'} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Double Elimination </Typography>
            <LockIcon />
          </MenuItem>
          <MenuItem disabled value={'roundRobin'} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Round Robin </Typography>
          <LockIcon />
          </MenuItem>

        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: spacingItems }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="dcategory-select"
          label="Category"
          value={tourCategory}
          onChange={(event) => { setTourCategory(event.target.value) }}
        >
          {categories.map((category) => {
            return <MenuItem key={category.id} value={category.id}> {category.name}</MenuItem>
          })}

        </Select>
      </FormControl>

      <TextField
        label="Game Name (Optional)"
        value={tourGameName}
        sx={{ width: '100%', marginBottom: spacingItems }}
        onChange={(event) => { setTourGameName(event.target.value) }}
      />

      <DatePicker
        sx={{ width: '100%', marginBottom: spacingItems }}
        value={tourDate}
        defaultValue={dayjs()}
        onChange={(newValue) => setTourDate(newValue)}
      />

      <TextField
        id="outlined-multiline-static"
        label="Description"
        onFocus={event => { event.target.select() }}
        value={tourDescription}
        multiline
        rows={8}
        sx={{ width: '100%', marginBottom: spacingItems }}
        onChange={(event) => { setTourDescription(event.target.value) }}
      />

      <Button
        variant="contained"
        sx={{
          width: '100%',
          bgcolor: 'primary.main'
        }}
        onClick={props.handleButtonNext}
      >Next</Button>
    </Box>
  );
};

export default TournamentTab;
