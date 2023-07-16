import React from 'react';
import { Card, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function PlayerCard(props) {

  return (
    <Card
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      sx={{
        bgcolor: props.snapshot.isDragging ? "secondary.main" : '#EDF2F4', display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px",
        ...props.provided.draggableProps.style
        
      }}

      variant="outlined"
      key={props.index}
    >
      <Typography variant="h6"
        sx={{ marginLeft: 1 }}
      > {props.index + 1} </Typography>

      <Typography variant="body1"> {props.participant} </Typography>
      <IconButton sx={{ color: 'primary.main' }} onClick={() => props.handleIconDelete(props.index)}>
        < ClearIcon fontSize="small" sx={{ color: 'primary.main' }} />
      </IconButton>
    </Card>
  )
}