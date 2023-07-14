import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtons = ({ tournament }) => {
  const domain = window.location.origin;

  return (
    <Container maxWidth='xs' sx={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h6" variant="h6" color="secondary.main">
        Share Tournament:
      </Typography>
      <div className="share-icons">
        <EmailShareButton 
          url={`${domain}/tournaments/${tournament.id}`}
          subject={`🏆 GameGridder Tournament: ${tournament.name}`}
          body={`Check out this tournament!\n\nTournament Name: ${tournament.name}\nTournament Description: ${tournament.description}\nTournament Start Date: ${tournament.start_date}\nTournament Link:\n`
        }
        >
          <EmailIcon size={48} round={true} />
        </EmailShareButton>

        <FacebookShareButton 
          url={`${domain}/tournaments/${tournament.id}`}
          quote={`Check out this GameGridder tournament: ${tournament.name}`}
          hashtag="GameGridder"
        >
          <FacebookIcon size={48} round={true} />
        </FacebookShareButton>

        <WhatsappShareButton 
          url={`${domain}/tournaments/${tournament.id}`}
          title={`GameGridder Tournament: ${tournament.name}`}
        >
          <WhatsappIcon size={48} round={true} />
        </WhatsappShareButton>

        <RedditShareButton 
          url={`${domain}/tournaments/${tournament.id}`}
          title={`GameGridder Tournament: ${tournament.name}`}
        >
          <RedditIcon size={48} round={true} />
        </RedditShareButton>
      </div>
    </Container>
  );
};

export default ShareButtons;