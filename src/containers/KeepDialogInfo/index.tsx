import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, InputBase } from '@mui/material'

import KeepColorsSetting from '../KeepColorsSetting'
import KeepImagesSetting from '../KeepImagesSetting'
import KeepImageList from '../KeepImageList'
import type { Keep } from '../../models'
import { useKeep, useKeepUpdate } from '../../hooks'

interface KeepDialogInfoProps {
  isOpen: boolean,
  keep?: Keep | null,
  closeDialog: () => void
}

const keepBackgroundSettingId = "dialog-keep-background-setting";
const keepImageSettingId = "dialog-keep-color-setting";

  // Диалоговое окно редактирование заметки
const KeepDialogInfo: React.FC<KeepDialogInfoProps> = ({ isOpen, keep, closeDialog }) => {
  const [keepId, setKeepId] = useState<Keep["id"]>("");
  const {
    keep: {
      title, text, color, images
    },
    colorChangeHandler,
    keepChangeHandler,
    keepImageAddHandler,
    keepImageDeleteHandler,
    setState
  } = useKeep();
  const keepEdit = useKeepUpdate({
    keep: {
      id: keepId,
      title,
      text,
      color,
      images
    },
    onEdit: closeDialog
  });

  const onCloseDialog = () => {
    keepEdit();
    closeDialog();
  }

  useEffect(() => {
    if (keep) {
      setKeepId(keep.id || "");
      setState("text", keep.text || "");
      setState("title", keep.title || "");
      setState("color", keep.color || "#ffffff");
      setState("images", keep.images);
    }
  }, [isOpen])

  return (
    <Dialog
      open={isOpen}
      onClose={onCloseDialog}
      PaperProps={{
        sx: { background: color }
      }}
      fullWidth
    >
      <DialogContent>
        {
          images.length === 1 ?
            <img src={images[0].img} width="100%" />
            :
            <KeepImageList
              images={images}
              onDelete={keepImageDeleteHandler}
            />
        }
        <InputBase
          name="title"
          placeholder="Текст заметки"
          value={title}
          onChange={keepChangeHandler}
          sx={{ height: 56, fontSize: 22 }}
          fullWidth
        />
        <InputBase
          name="text"
          placeholder="Введите заголовок"
          value={text}
          onChange={keepChangeHandler}
          sx={{ height: 46, fontSize: 16 }}
          fullWidth
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <KeepColorsSetting
              keepSettingId={keepBackgroundSettingId}
              onChange={colorChangeHandler}
            />
            <KeepImagesSetting
              keepSettingId={keepImageSettingId}
              onImageAdd={keepImageAddHandler}
            />
          </Box>
          <Box>
            <Button
              color="inherit"
              onClick={onCloseDialog}
            >
              Закрыть
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default KeepDialogInfo