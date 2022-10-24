import React, { useState, useEffect } from 'react';
import { Paper, InputBase, Box, Button } from "@mui/material";

import { KeepColorsSetting, KeepImagesSetting, KeepImageList } from '..';
import { useKeep, useKeepCreate } from '../../hooks';
import "./keep-create.styles.scss";

const keepBackgroundSettingId = "keep-background-setting";
const keepImageSettingId = "keep-image-setting";

// Компонент карточки создания заметки
const KeepCreate: React.FC = () => {
  const [keepActive, setKeepActive] = useState(false);
  const {
    keep: {
      title, text, color, images
    },
    colorChangeHandler,
    keepChangeHandler,
    keepImageAddHandler,
    keepImageDeleteHandler,
    resetKeep
  } = useKeep();
  const keepCreate = useKeepCreate({
    keep: {
      title, text, color, images
    }
  });

  const onKeepCreate = () => {
    keepCreate();
    resetKeep();
  }

  // Функции работает при клики к <body></body>
  const bodyClickHandler = (event: MouseEvent) => {
    if (event.target) {
      const target = event.target as HTMLElement;
      const keepCreateEl = target.closest(".keep-paper");
      const keepColorSettingEl = target.closest("#" + keepBackgroundSettingId);
      const keepImageSettingEl = target.closest("#" + keepImageSettingId);
      if (!keepCreateEl && !keepColorSettingEl && !keepImageSettingEl && keepActive) { 
        // Создание заметки
        setKeepActive(false);
        colorChangeHandler("#ffffff");
        onKeepCreate();
      }
      if (keepCreateEl || keepColorSettingEl) {
        setKeepActive(true);
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener("click", bodyClickHandler);
    return () => {
      document.body.removeEventListener("click", bodyClickHandler);
    }
  }, [text, title, images, color, keepActive])

  return (
    <div className="keep-create">
      <Paper
        sx={{ flex: 1, maxWidth: 598, p: 2, background: color }}
        className="keep-paper"
        elevation={5}
      >
        {
          keepActive &&
          <KeepImageList
            images={images}
            onDelete={keepImageDeleteHandler}
          />
        }
        {
          keepActive &&
          <InputBase
            sx={{ flex: 1, height: 44 }}
            placeholder="Введите заголовок"
            name="title"
            value={title}
            onChange={keepChangeHandler}
            fullWidth
          />
        }
        <InputBase
          sx={{ flex: 1, height: 44 }}
          placeholder="Заметкa..."
          name="text"
          value={text}
          onChange={keepChangeHandler}
          fullWidth
        />
        {
          keepActive &&
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
                onClick={() => setKeepActive(false)}
              >
                Закрыть
              </Button>
            </Box>
          </Box>
        }
      </Paper>
    </div>
  )
}

export default KeepCreate