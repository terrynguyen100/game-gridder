import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Image from 'mui-image';
import { AuthContext } from '../providers/AuthProvider';
import joypad from '../images/joypad.svg';
import cards from '../images/cards.png';
import sports from '../images/sports.png';
import chess from '../images/chess.png';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [userTournaments, setUserTournaments] = useState([]);
  const [favCategory, setFavCategory] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const { userId } = useContext(AuthContext);

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
          setFavCategory(response.data)
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



  return (
    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', flexDirection: "column", mt: 20 }}>
      <Avatar
        alt=""
        src={user.profile_img}
        sx={{ bgcolor: '#BB0C05', width: 150, height: 150 }}
      />
      <Typography align='center' mt={2} variant="h4" sx={{ color: 'white', fontFamily: 'Bebas Neue', fontSize: '3rem', letterSpacing: '.15rem' }}>{user.user_name}</Typography>
      <Typography align='center' mt={2} sx={{ color: 'white', fontFamily: 'Titillium Web', fontSize: '1.5rem' }}>Total wins: {user.wins}</Typography>
      <Typography align='center' mt={3} sx={{ color: 'white', fontFamily: 'Titillium Web', fontSize: '1.5rem' }}>Total tournaments organized: {userTournaments.length}</Typography>
      <Typography align='center' mt={2} sx={{ color: 'white', fontFamily: 'Titillium Web', fontSize: '1.5rem' }}>Favourite game category: {favCategory.name}</Typography>
      <Image src={imageSrc} width={'30%'}/>
    </Container>
  );
};

export default UserProfile;