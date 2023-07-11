import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TournamentView from './TournamentView';
import TournamentTab from './TournamentTab';
import { CreateTournamentContext } from '../../providers/CreateTournamentProvider';
import axios from 'axios';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: 65,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const { 
    categories,setCategories,
  } = useContext(CreateTournamentContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categoriesData = await axios.get("categories/")
    setCategories(categoriesData.data)
  }

  const handleDrawerOpen = (tab) => {
    setTab(tab);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer variant="permanent" open={open} PaperProps={{
        sx: {bgcolor: 'white', zIndex: 0}}}>
        <DrawerHeader sx={{height: 80}}>
        </DrawerHeader>
        <List>
        {['Tournament', 'Participants', 'Themes'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* add style={{ color: 'red' }} to change icon color */}
                  {index === 0 && (
                    <EmojiEventsIcon
                      fontSize='large'
                      onClick={() => handleDrawerOpen(0)}
                    />
                  )}
                  {index === 1 && (
                    <GroupsIcon
                      fontSize='large'
                      onClick={() => handleDrawerOpen(1)}
                    />
                  )}
                  {index === 2 && (
                    <ColorLensIcon
                      fontSize='large'
                      onClick={() => handleDrawerOpen(2)}
                    />
                  )}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
        </List>
        <Divider />
      </Drawer>
      {(open === true ) && 
      <Box sx={{
        bgcolor: 'white',
        width: '300px',
        height: '100vh',
        borderLeft: '1px solid gray',
        marginLeft: '10px',
      }}>
        {(tab === 0 ) && <TournamentTab/>}
        {(tab === 1 ) && <div>11111111111111111111111</div>}
        {(tab === 2 ) && <div>222222222222222222</div>}
      </Box>} 

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <TournamentView />
      </Box>
    </Box>
  );
}