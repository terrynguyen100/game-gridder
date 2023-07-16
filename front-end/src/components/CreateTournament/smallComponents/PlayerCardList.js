import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlayerCard from "./PlayerCard";
import { Box, Typography, Divider, Container, useThemeProps } from '@mui/material';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';

const PlayerCardList = ({ tourParticipants, handleDragEnd, handleIconDelete, spacingItems, handleShuffle }) => {

  return (
    <Box
      sx={{
        padding: '10px',
        border: '1px solid black',
        borderRadius: 2,
        marginBottom: spacingItems,
        maxHeight: '54vh',
        overflow: 'auto',
        bgcolor: '#2B2D42'
      }}
    >
      <Container className='card-list-header' sx={{display: 'flex', justifyContent: 'space-between'}}>
        <ShuffleOnIcon 
          sx={{ bgcolor: "white" , marginTop: '5px'}}
          onClick={handleShuffle}
        ></ShuffleOnIcon>
        <Typography variant="h6" sx={{ marginBottom: 1, color: "white" }}>Players</Typography>
        <ShuffleOnIcon sx={{ opacity: '0' }}></ShuffleOnIcon>

      </Container>
      <Divider color="#EDF2F4" sx={{ marginBottom: 1 }}></Divider>
      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tourParticipants">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tourParticipants.map((participant, index) => (
                  <Draggable key={participant} draggableId={participant} index={index}>
                    {(provided, snapshot) => (
                      <PlayerCard
                        index={index}
                        handleIconDelete={handleIconDelete}
                        participant={participant}
                        provided={provided}
                        snapshot={snapshot}
                      ></PlayerCard>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Box>
  );
};

export default PlayerCardList;
