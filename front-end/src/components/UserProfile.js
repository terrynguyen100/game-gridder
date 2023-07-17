import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Image from 'mui-image';
import { AuthContext } from '../providers/AuthProvider';
import joypad from '../images/joypad.svg';
import cards from '../images/cards.png';
import sports from '../images/sports.png';
import chess from '../images/chess.png';
import { Button } from '@mui/material';
import { ErrorContext } from '../providers/ErrorProvider';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userTournaments, setUserTournaments] = useState([]);
  const [favCategory, setFavCategory] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [changePhoto, setChangePhoto] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const { userId, setAvatarURL } = useContext(AuthContext);
  const { displayError } = useContext(ErrorContext);

  useEffect(() => {
    let categoryID = 1;
    axios.get(`/users/${userId}`)
      .then(response => setUser(response.data))
      .catch((error) => {
        console.log(error);
      });

    axios.get(`/tournaments/users/${userId}`)
      .then(response => {
        const tournamentArr = response.data;
        setUserTournaments(tournamentArr);
        let categories = {};
        for (let tournament of tournamentArr) {
          let categoriesKeys = Object.keys(categories);
          if (categoriesKeys.includes(tournament.category_id.toString())) {
            categories[tournament.category_id]++;
          } else {
            categories[tournament.category_id] = 1;
          }
        }

        let categoryCounts = [];
        for (let categoryCount in categories) {
          categoryCounts.push(categories[categoryCount]);
        }

        categoryCounts.sort((a, b) => b - a);

        for (let category in categories) {
          if (categories[category] === categoryCounts[0]) {
            categoryID = category;
          }
        }

        axios.get(`/categories/${categoryID}`)
          .then(response => {
            setFavCategory(response.data);
            if (response.data.name === 'Card Game') {
              setImageSrc(cards);
            }
            if (response.data.name === 'Video Game') {
              setImageSrc(joypad);
            }
            if (response.data.name === 'Chess') {
              setImageSrc(chess);
            }
            if (response.data.name === 'Sports') {
              setImageSrc(sports);
            }
          });
      });

  }, [userId]);

  const showTextField = () => {
    setChangePhoto((prev) => !(prev));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const imageURL = data.get('image_url');
    if (imageURL === "") {
      displayError("Please enter a URL")
      return;
    }
    
    axios.put(`/users/${userId}/edit`, {
      profile_img: imageURL,
    })
      .then(response => {
        setAvatarURL(response.data.profile_img);
        navigate(`/users/${userId}/dashboard`);
      })
      .catch((error) => {
        displayError(error);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', flexDirection: "column", mt: 20 }}>
      <Avatar
        alt=""
        src={user.profile_img}
        sx={{ bgcolor: '#BB0C05', width: 150, height: 150 }}
      />
      <Button onClick={showTextField} size="large">Update profile image</Button>
      {changePhoto &&
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            name="image_url"
            label="Profile Image URL"
            type="url"
            id="imageurl"
            value={profilePhotoUrl}
            onChange={(e) => setProfilePhotoUrl(e.target.value)}
            autoComplete="new-password"
            color="secondary"
            sx={{
              "& .MuiInputLabel-root": { color: 'white', opacity: '0.6' },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "white", opacity: '0.3' },
              },
              input: { color: 'white' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, fontSize: '1.25rem', letterSpacing: '0.06rem' }}
          >
            Update
          </Button>
        </Box>
      }
      <Typography align='center' mt={2} variant="h4" sx={{ color: 'white', fontFamily: 'Bebas Neue', fontSize: '3rem', letterSpacing: '.15rem' }}>{user.user_name}</Typography>
      <Typography align='center' mt={2} sx={{ color: 'white', fontFamily: 'Titillium Web', fontSize: '1.5rem' }}>Total wins: {user.wins}</Typography>
      <Typography align='center' mt={3} sx={{ color: 'white', fontFamily: 'Titillium Web', fontSize: '1.5rem' }}>Total tournaments organized: {userTournaments.length}</Typography>
      <Typography align='center' mt={2} sx={{ color: 'white', fontFamily: 'Titillium Web', fontSize: '1.5rem' }}>Favourite game category: {favCategory.name}</Typography>
      {imageSrc !== null && <Image src={imageSrc} width={'30%'} />}
    </Container>
  );
};

export default UserProfile;