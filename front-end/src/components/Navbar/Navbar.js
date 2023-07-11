import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { RouteContext } from '../../providers/RouteProvider';
import { AuthContext } from '../../providers/AuthProvider';

const pages = ['Tournaments', 'Communities'];
const tournamentOptions = ['Create', 'View'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const { changeRoute } = useContext(RouteContext);
  const { auth, logout } = useContext(AuthContext);
 
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElTournament, setAnchorElTournament] = useState(null);

  // Open MaterialUI drop-down menus
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenTournamentMenu = (event) => {
    setAnchorElTournament(event.currentTarget);
  };

  // Close MaterialUI drop-down menus
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Logout') {
      logout();
      changeRoute('/');
    }
    if (setting === 'Profile') changeRoute('/user')
  };

  const handleCloseTournamentMenu = () => {
    setAnchorElTournament(null);
  };

  return (
    <AppBar sx={{ backgroundColor: '#BB0C05' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <EmojiEventsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Bebas Neue',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GAMEGRIDDER
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <EmojiEventsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Bebas Neue',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <div key={page}>
                <Button
                  onClick={handleOpenTournamentMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
                <Menu
                  anchorEl={anchorElTournament}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
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
                  {tournamentOptions.map((option) => (
                    <MenuItem key={option} onClick={handleCloseTournamentMenu}>
                      <Typography textAlign="center">{option}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ))}
          </Box>

          { auth ? 
            <Box sx={{ flexGrow: 0 }}>  
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> : 
            <Box sx={{ flexGrow: 0 }}>
              <Button onClick={() => changeRoute('/login')} sx={{ my: 2, color: 'white', display: 'inline' }}>
                Login
              </Button>
              <Button onClick={() => changeRoute('/register')} sx={{ my: 2, color: 'white', display: 'inline' }}>
                Sign Up
              </Button>
            </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;