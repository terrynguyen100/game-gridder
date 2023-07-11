import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { RouteContext } from "../providers/RouteProvider";

const Login = () => {
  const { changeRoute } = useContext(RouteContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="sm" mt="20" >
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#BB0C05",
        }}
      >
        <Typography component="h1" variant="h5" sx={{color: 'white', fontFamily: 'Bebas Neue', fontSize: '2rem', letterSpacing: '.1rem' }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            color="warning"
            autoFocus
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
            color="warning"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2 }}
          >
            Let's Go!
          </Button>
          <Grid container>
            <Grid item xs>
              <Link 
                variant="body2"                 
                color="white"
                component="button"
                underline="hover">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                color="white"
                component="button"
                underline="hover"
                onClick={() => changeRoute('/register')} 
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