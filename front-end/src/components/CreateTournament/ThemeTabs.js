import { useState } from "react";
import { Box, Typography } from "@mui/material";


const ThemesTab = () => {

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
