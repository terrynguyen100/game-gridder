import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlayerCard from "./PlayerCard";
import { Box, Typography, Divider } from '@mui/material';

const PlayerCardList = ({ tourParticipants, handleDragEnd, handleIconDelete, spacingItems }) => {

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
      <Typography variant="h6" sx={{ marginBottom: 1, color: "white" }}>Players</Typography>
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
