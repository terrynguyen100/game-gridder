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
import SettingsIcon from '@mui/icons-material/Settings';
import PrintIcon from '@mui/icons-material/Print';

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
    categories, setCategories,
  } = useContext(CreateTournamentContext);

  const icons = [
    { icon: <EmojiEventsIcon fontSize='large' />, index: 0 },
    { icon: <GroupsIcon fontSize='large' />, index: 1 },
    { icon: <ColorLensIcon fontSize='large' />, index: 2 },
    { icon: <SettingsIcon fontSize='large' />, index: 3 },
    { icon: <PrintIcon fontSize='large' />, index: 4 },
  ];

  const listItems = icons.map(({ icon, index }) => (
    <ListItem disablePadding sx={{ display: 'block' }} key={index}>
      <ListItemButton sx={{ minHeight: 48, justifyContent: 'center', px: 2.5 }}>
        <ListItemIcon sx={{ minWidth: 0, mr: 'auto', justifyContent: 'center', color: '#EDF2F4'}}> 
          {React.cloneElement(icon, { onClick: () => handleDrawerOpen(index) })}
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  ));

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categoriesData = await axios.get("/categories")
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
        sx: { bgcolor: '#2B2D42', zIndex: 0 }
      }}>
        <DrawerHeader sx={{ height: 80 }}>
        </DrawerHeader>
        <List>

          <>{listItems}</>

          <Divider />
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: 'center', px: 2.5, }}>
              <ListItemIcon sx={{ minWidth: 0, mr: 'auto', justifyContent: 'center', }}>
                <ChevronLeftIcon
                  fontSize='large'
                  onClick={handleDrawerClose}
                  sx={{ color: '#EDF2F4' }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      {(open === true) &&
        <Box sx={{
          bgcolor: '#8D99AE',
          width: '300px',
          height: '100vh',
          borderLeft: '1px solid gray',
          marginLeft: '10px',
        }}>
          {(tab === 0) && <TournamentTab />}
          {(tab === 1) && <div>11111111111111111111111</div>}
          {(tab === 2) && <div>222222222222222222</div>}
        </Box>}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <TournamentView />
      </Box>
    </Box>
  );
}