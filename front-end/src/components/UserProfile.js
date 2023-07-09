import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const UserProfile = () => {
  return (
    <Container maxWidth="lg" sx={{display: 'flex', alignItems: 'center', flexDirection: "column", mt: 20}}>
      <Avatar
        alt=""
        src=""
        sx={{ bgcolor: '#BB0C05', width: 150, height: 150 }}
      />
      <Typography align='center' mt={2} variant="h4" sx={{color: 'white', fontFamily: 'Bebas Neue', fontSize: '3rem', letterSpacing: '.15rem'}}>Username</Typography>
      <Typography align='center' mt={3} sx={{color: 'white', fontFamily: 'Titillium Web', fontSize: '1.5rem'}}>Total tournaments built: 0</Typography>
      <Typography align='center' mt={2} sx={{color: 'white', fontFamily: 'Titillium Web', fontSize: '1.5rem'}}>Total wins: 0</Typography>
    </Container>
  );
};

export default UserProfile;