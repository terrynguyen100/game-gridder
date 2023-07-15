import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import joypad from './../../images/joypad.svg';
import cards from './../../images/cards.png';
import sports from './../../images/sports.png';
import chess from './../../images/chess.png';

const CardPhoto = ({categoryID}) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios.get(`/categories/${categoryID}`)
    .then((response) => {
      setCategory(response.data);
    })
  }, [])

  const SelectPhoto = (category) => {
    switch (category.name) {
      case 'Card Game':
        return cards;
      case 'Chess':
        return chess;
      case 'Video Game':
        return joypad;
      case 'Sports':
        return sports;
  
      default:
        return cards;
    }
  }

  if (category !== null) {
  return (
    <CardMedia
    component="img"
    alt={category.name}
    image={SelectPhoto(category)}
    height="175px"
    width="auto"
  />
  ) } else {
    return (
      <Container 
        sx={{
          display: 'flex', 
          justifyContent:'center', 
          alignItems:'center', 
          height: 200}}
      >
        <CircularProgress color="secondary" sx={{}} />
      </Container>
    )
  }
}

export default CardPhoto;