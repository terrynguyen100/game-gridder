import { useContext, useEffect, useState } from "react";
import { RouteContext } from '../../providers/RouteProvider';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import { DatePicker } from "@mui/x-date-pickers";

const TournamentTab = () => {
  const { changeRoute } = useContext(RouteContext);
  const {
    tourName, setTourName,
    tourType, setTourType,
    tourCategory, setTourCategory,
    tourDescription, setTourDescription,
    tourDate, setTourDate,
    categories, setCategories,
  } = useContext(CreateTournamentContext);

  const spacingItems = 2;
  const componentColor ="#EDF2F4";

  return (
      <Box sx={{
        marginLeft: 2,
        marginRight: 2,
        marginTop: 12,
        textAlign: 'center',

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
            <MenuItem value={'singleElemination'}>Single Elimination</MenuItem>
            <MenuItem value={'doubleElemination'}>Double Elimination</MenuItem>

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
              return <MenuItem key={category.id} value={category.name}> {category.name}</MenuItem>
            })}

          </Select>
        </FormControl>
        
        <DatePicker 
          sx={{ width: '100%', marginBottom: spacingItems }}
          value={tourDate}
          onChange={(newValue) => setTourDate(newValue)}
        />

        <TextField
          id="outlined-multiline-static"
          label="Description"
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
            bgcolor: '#BB0C05'
          }}
        >Next</Button>
      </Box>
  );
};

export default TournamentTab;
