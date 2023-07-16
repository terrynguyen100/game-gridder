import { Container, Typography, Link } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <Container className="footer-content" maxWidth="lg">
        <div className="about">
          <Typography variant="h5" color="primary" sx={{ textAlign: "center" }}>About
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>GameGridder was built by Clayton Persinger, Lindsay Ward, and Terry Nguyen as a final Lighthouse Labs Web Development project. This app uses React, Express, Node.js, and PostgreSQL.</Typography>
        </div>
        <div className="contact">
          <Typography variant="h5" color="primary" sx={{ textAlign: "center" }}>Contact Us
          </Typography>
          <div className="creators">
            <div className="creator">
              <Typography variant="body1" color="text.secondary">Clayton:</Typography>
              <Link href="https://www.linkedin.com/in/clayton-persinger-7b8415104/" target="_blank" rel="noopener">
                <LinkedInIcon />
              </Link>
            </div>
            <div className="creator">
              <Typography variant="body1" color="text.secondary">Lindsay:</Typography>
              <Link href="https://www.linkedin.com/in/lindsaymward21/" target="_blank" rel="noopener">
                <LinkedInIcon />
              </Link>
            </div>
            <div className="creator">
              <Typography variant="body1" color="text.secondary">Terry:</Typography>
              <Link href="https://www.linkedin.com/in/tu-nguyen0/" target="_blank" rel="noopener">
                <LinkedInIcon />
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <div className="copyright">
        <Typography variant="body2" color="primary" sx={{ textAlign: "center", marginRight: '1rem' }}>©2023 GameGridder</Typography>
        <Link href="https://github.com/terrynguyen100/game-gridder" target="_blank" rel="noopener">
          <GitHubIcon />
        </Link>
      </div>
    </div>
  );
};

export default Footer;