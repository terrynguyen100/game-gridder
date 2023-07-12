import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext, useState } from 'react';
import { RouteContext } from '../providers/RouteProvider';
import { AuthContext } from '../providers/AuthProvider';
import { ErrorContext } from '../providers/ErrorProvider';

const Register = () => {
  const { changeRoute } = useContext(RouteContext);
  const { login } = useContext(AuthContext);
  const { displayError } = useContext(ErrorContext);

  const [dateOfBirth, setDateOfBirth] = useState(null);


  const formatDateOfBirth = (dateOfBirth) => {
    if (dateOfBirth !== null) {
      let day = dateOfBirth.$D;
      let month = dateOfBirth.$M + 1;
      let year = dateOfBirth.$y;

      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;

      return `${year}-${month}-${day}`;
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('username');
    if (username === '') return displayError("Please enter a username");
    const email = data.get('email');
    if (email === '') return displayError("Please enter an email");
    const password = data.get('password');
    if (password === '') return displayError("Please enter a password");
    const imageURL = data.get('image_url');


    axios.post('/users/create', {
      user_name: username,
      email: email,
      password: password,
      date_of_birth: formatDateOfBirth(dateOfBirth),
      profile_img: imageURL,
      wins: 0
    })
      .then((response) => {
        login(response.data.id);
        changeRoute('/');
      })
      .catch((error) => {
        displayError(error);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: "#BB0C05"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'white', fontFamily: 'Bebas Neue', fontSize: '2rem', letterSpacing: '.1rem' }}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                type="text"
                autoFocus
                color="warning"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                color="warning"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                color="warning"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                fullWidth
                name="date-of-birth"
                id="date-of-birth"
                label='Date of Birth'
                color="warning"
                value={dateOfBirth}
                onChange={(newValue) => setDateOfBirth(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="image_url"
                label="Profile Image URL"
                type="url"
                id="imageurl"
                autoComplete="new-password"
                color="warning"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link
                color="white"
                component="button"
                underline="hover"
                onClick={() => changeRoute('/login')}
                variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;