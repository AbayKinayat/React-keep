import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import type { KeepImage } from '../../models/Keep';

interface KeepImageListProps {
  images: KeepImage[],
  onDelete?: (id: KeepImage["id"]) => void,
  onClick?: () => void,
}

  // Картинки заметки
const KeepImageList: React.FC<KeepImageListProps> = ({ images, onDelete, onClick = () => { } }) => {
  return (
    <ImageList
      onClick={onClick}
    >
      {images.map((keep) => (
        <ImageListItem key={keep.id} >
          <img
            src={keep.img}
            loading="lazy"
          />
          {
            onDelete &&
            <ImageListItemBar
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  onClick={onDelete.bind(null, keep.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          }
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default KeepImageList