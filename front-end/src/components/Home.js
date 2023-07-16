import { Link } from 'react-router-dom';
import '../sass/home.scss';
import { Container, Button, Typography } from '@mui/material';
import Image from 'mui-image';
import cards from '../images/amanda-jones-P787-xixGio-unsplash.jpg';
import videoGames from '../images/fredrick-tendong-HVYepJYeHdQ-unsplash.jpg';
import chess from '../images/alex-engelman--LCRyAc0WfE-unsplash.jpg';
import Footer from './Footer';

const Home = () => {

  return (
    <div className="home">
      <div>
        <h2>Make a tournament for sports, games, and more!</h2>
        <Image src={cards} alt="playing cards" width="100vw" height="40vh" className="hero-img" />
      </div>
      <Container maxwidth="md">
        <div className="buttons">
          <Button variant="contained" component='p' id="create-btn" size="large" sx={{ fontSize: "1.75rem" }}>
            <Link to={"/tournaments/create"}>
              Create a Tournament
            </Link>
          </Button>
          <Button variant="contained" component='p' id="find-btn" size="large" sx={{ fontSize: "1.75rem" }}>
            <Link to={"/tournaments/view"}>
              Find a Tournament
            </Link>
          </Button>
        </div>
        <div className="card">
          <Image src={videoGames} width="50%" />
          <span className="text">
            <Typography variant="h4" color="secondary" sx={{ width: '75%', textAlign: 'center' }}>One to Rule Them All</Typography>
            <Typography color="primary.contrastText" sx={{ width: '75%', textAlign: 'center' }}>Setup a single-elimination tournament where players go head to head until there's only one person left.</Typography>
          </span>
        </div>
        <div className="card">
          <span className="text">
            <Typography variant="h4" color="secondary" sx={{ width: '75%', textAlign: 'center' }}>Friendly Competition</Typography>
            <Typography color="primary.contrastText" sx={{ width: '75%', textAlign: "center" }}>Share your tournament via email, Facebook, WhatsApp, or Reddit to show the current tournament bracket, including the final results.</Typography>
          </span>
          <Image src={chess} width="50%" />
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;