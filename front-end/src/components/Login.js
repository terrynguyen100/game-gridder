import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ErrorContext } from "../providers/ErrorProvider";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { displayError } = useContext(ErrorContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    if (!username) return displayError('Please enter a username');
    const password = data.get("password");
    if (!password) return displayError('Please enter a password');

    axios.get(`/users/login/${username}`)
    .then((response) => {
      login(response.data.id);
      navigate(`/users/${response.data.id}/dashboard`);
    })
    .catch(() => {
      displayError('Verify your username and password are correct');
    })
  };

  return (
    <Container component="main" maxWidth="sm" mt="20" >
      <Box bgcolor='primary.main'
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h4" color="primary.contrastText" sx={{  letterSpacing: '.1rem' }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            color="secondary"
            autoFocus
            sx={{
              "& .MuiInputLabel-root": {color: 'white', opacity: '0.6'},
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "white", opacity: '0.3' },
              },
              input: { color: 'white' }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="secondary"
            sx={{
              "& .MuiInputLabel-root": {color: 'white', opacity: '0.6'},
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "white", opacity: '0.3' },
              },
              input: { color: 'white' }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, fontSize: '1.25rem', letterSpacing: '0.06rem' }}
          >
            Let's Go!
          </Button>
          <Grid container>
            <Grid item>
              <Link 
                color="primary.contrastText"
                component="button"
                underline="hover"
                onClick={() => navigate('/register')} 
                variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;