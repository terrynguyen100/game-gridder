import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
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

const pages = ['Tournaments', 'Communities'];
const tournamentOptions = ['Create', 'View'];
const settings = ['Profile', 'Dashboard', 'Logout'];

function Navbar() {
  const { auth, logout, userId, avatarURL, setAvatarURL } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElTournament, setAnchorElTournament] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.get(`/users/${userId}`)
        .then((response) => {
          setAvatarURL(response.data.profile_img);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

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

    if (setting === 'Profile') {
      navigate(`/users/${userId}/profile`);
    }

    if (setting === 'Dashboard') {
      navigate(`/users/${userId}/dashboard`);
    }

    if (setting === 'Logout') {
      logout();
      navigate('/');
    }

  };

  const handleCloseTournamentMenu = () => {
    setAnchorElTournament(null);
  };

  return (
    <AppBar>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <EmojiEventsIcon color="secondary" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link to='/'>
            <Typography
              variant="h1"
              noWrap
              color="secondary"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontSize: '2rem',
                fontWeight: 700,
                letterSpacing: '.2rem',
                textDecoration: 'none',
              }}>
              GAMEGRIDDER
            </Typography>
          </Link>

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
          <Link to='/'>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Bebas Neue',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
              }}>
              GG
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <div key={page}>
                <Button
                  onClick={handleOpenTournamentMenu}
                  sx={{ my: 2, fontSize: '1.25rem', color: 'primary.contrastText', display: 'block' }}
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
                      <Link to={`/tournaments/${option}`}>
                        <Typography textAlign="center" color="text.primary">
                          {option}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ))}
            <div key='hallOfFame'>
              <Link to='/rankings'>
                <Button
                  sx={{ my: 2, fontSize: '1.25rem', color: 'primary.contrastText', display: 'block' }}>
                  Hall Of Fame
                </Button>
              </Link>
            </div>
          </Box>

          {auth ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={avatarURL} />
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
              <Button component='p' sx={{ my: 2, display: 'inline', fontSize: '1.25rem' }}>
                <Link to={'/login'}>
                  Login
                </Link>
              </Button>
              <Button component='p' sx={{ my: 2, display: 'inline', fontSize: '1.25rem' }}>
                <Link to={'/register'}>
                  Sign Up
                </Link>
              </Button>
            </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;