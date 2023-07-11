import { useContext, useEffect, useState } from "react";
import { RouteContext } from '../../providers/RouteProvider';
import { Input, Button, TextField, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import axios from "axios";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";

const TournamentTab = () => {
  const { changeRoute } = useContext(RouteContext);
  const {
    tourName, setTourName,
    tourType, setTourType,
    tourCategory, setTourCategory,
    tourDescription, setTourDescription,
    categories, setCategories,
  } = useContext(CreateTournamentContext);

  const spacingItems = 3;

  return (
    <div>
      <Box sx={{
        marginLeft: 2,
        marginRight: 2,
        marginTop: 15
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
            <MenuItem value={'singleElemination'}>Single Elemination</MenuItem>
            <MenuItem value={'doubleElemination'}>Double Elemination</MenuItem>

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
        
        <DatePicker />
        
        <TextField
          id="outlined-multiline-static"
          label="Description"
          value={tourDescription}
          multiline
          rows={8}
          sx={{ width: '100%', marginBottom: spacingItems }}
          onChange={(event) => { setTourDescription(event.target.value) }}
        />

        <Button variant="contained">Next</Button>
      </Box>

    </div>
  );
};

export default TournamentTab;
