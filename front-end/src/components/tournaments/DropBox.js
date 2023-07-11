import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { useState } from 'react'

const DropBox = ({ title, filter, dropDownItems, handleClick }) => {
  const [anchorElTournament, setAnchorElTournament] = useState(null);

  const handleOpenTournamentMenu = (event) => {
    setAnchorElTournament(event.currentTarget);
  };

  const handleCloseTournamentMenu = () => {
    setAnchorElTournament(null);
  };
  
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "space-between", height: "100%"}}>
        <>
          <div id="">
            <Typography variant="p" component="div" sx={{ padding: "4px" }}>
              {title}
            </Typography>
            <Typography variant="p" component="div" sx={{ padding: "4px" }}>
              {filter}
            </Typography>
          </div>
          <Button
            onClick={handleOpenTournamentMenu}
            sx={{ my: 2, color: 'white', display: "flex", alignItems: "end"}}

          >
             <KeyboardArrowDownRoundedIcon sx={{color: "#FFF"}}/>
          </Button>
          <Menu
            anchorEl={anchorElTournament}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElTournament)}
            onClose={handleCloseTournamentMenu}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}>
            {dropDownItems.map((option) => (
              <MenuItem key={option} onClick={handleCloseTournamentMenu}>
                <Typography textAlign="center" onClick={handleClick}>{option}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
     
    </Box>
  )
};

export default DropBox;