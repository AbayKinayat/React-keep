import React, { useState } from 'react';
import { Tooltip, IconButton, Popover, Box, InputBase, Button } from "@mui/material";
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';

interface KeepImagesSettingProps {
  keepSettingId: string;
  onImageAdd?: (image: string) => void
}

  // Настройка картинок заметки
const KeepImagesSetting: React.FC<KeepImagesSettingProps> = ({ keepSettingId, onImageAdd = () => {} }) => {
  const [imageAnchorEl, setImageAnchorEl] = useState<HTMLButtonElement | null>(null);
  const keepImageSettingOpen = Boolean(imageAnchorEl);
  const keepImageSettingId = keepImageSettingOpen ? keepSettingId : undefined;
  const [keepImage, setKeepImage] = useState("");

  const keepImageSettingClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setImageAnchorEl(event.currentTarget);
  };

  const keepImageSettingCloseHandler = () => {
    setImageAnchorEl(null);
  };

  const keepImageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeepImage(event.target.value);
  }

  const imageAddHandler = () => {
    if (keepImage)
      onImageAdd(keepImage);
    setKeepImage("");
    keepImageSettingCloseHandler();
  }

  return (
    <>
      <Tooltip title="Добавить картинку">
        <IconButton
          aria-describedby={keepImageSettingId || ""}
          sx={{ mr: 1 }}
          onClick={keepImageSettingClickHandler}
        >
          <PhotoOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Popover
        id={keepImageSettingId}
        open={keepImageSettingOpen}
        anchorEl={imageAnchorEl}
        onClose={keepImageSettingCloseHandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        elevation={2}
      >
        <Box
          display="flex"
          padding={1}
        >
          <InputBase
            placeholder="Вставьте путь к изображению"
            value={keepImage}
            onChange={keepImageChangeHandler}
            sx={{ width: 400, mr: 2 }}
          />
          <Button
            color="inherit"
            onClick={imageAddHandler}
          >
            Добавить
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default KeepImagesSetting