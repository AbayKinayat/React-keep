import React from 'react';
import { Box, Grid } from '@mui/material';

import type { Keep } from '../../models';
import { KeepCard } from '../';

interface KeepListProps {
  keeps: Keep[],
  editable?: boolean,
  search?: string,
  editKeep?: (keep: Keep) => void,
  onSelectKeep?: (keep: Keep) => void,
  emptyText?: string
}

// Заметки
const KeepList: React.FC<KeepListProps> = ({ keeps, editable, search, emptyText = "Здесь будут ваши заметки.", editKeep = () => { }, onSelectKeep }) => {

  return (
    <Grid container spacing={2} >
      {
        keeps.length ?
          keeps.map(keep => (
            <Grid key={keep.id} item xs={2}>
              <KeepCard
                keep={keep}
                editKeep={editKeep}
                editable={editable}
                onSelectKeep={onSelectKeep}
                search={search}
              />
            </Grid>
          )) :
          <Box
            display="flex"
            justifyContent="center"
            py={15}
            width="100%"
            fontSize={"1.375rem"}
          >
            {emptyText}
          </Box>
      }
    </Grid>
  )
}

export default KeepList