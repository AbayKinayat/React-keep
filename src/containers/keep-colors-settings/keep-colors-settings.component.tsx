import React, { useState } from 'react';
import { IconButton, Tooltip, Popover, Box } from "@mui/material";
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';

import { COLORS } from '../../colors';
import { ColorItem } from '../../components';

interface KeepColorsSettingProps {
  keepSettingId: string,
  onChange?: (color: string) => void
}

// Настройка цвета заметки
const KeepColorsSetting: React.FC<KeepColorsSettingProps> = ({ keepSettingId, onChange = () => { } }) => {
  const [colorAnchorEl, setColorAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const keepColorSettingOpen = Boolean(colorAnchorEl);
  const keepColorSettingId = keepColorSettingOpen ? keepSettingId : undefined;
  const [colorValue, setColorValue] = useState<string>("#ffffff");

  const keepColorSettingClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColorAnchorEl(event.currentTarget);
  };

  const keepColorSettingCloseHandler = () => {
    setTimeout(() => {
      setColorAnchorEl(null);
    }, 100)
  };

  const changeColor = (color: string) => {
    setColorValue(color);
    onChange(color);
  }

  return (
    <>
      <Tooltip title="Параметры фона">
        <IconButton
          aria-describedby={keepColorSettingId || ""}
          sx={{ mr: 1 }}
          onClick={keepColorSettingClickHandler}
        >
          <ColorLensOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Popover
        id={keepColorSettingId}
        open={keepColorSettingOpen}
        anchorEl={colorAnchorEl}
        onClose={keepColorSettingCloseHandler}
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
          {
            COLORS.map(color => (
              <Tooltip
                title={color.title}
                key={color.title}
              >
                <div style={{ padding: 3 }}>
                  <ColorItem
                    title={color.title}
                    color={color.color}
                    bordered={color.bordered}
                    selected={colorValue === color.color}
                    onClick={changeColor.bind(null, color.color)}
                  />
                </div>
              </Tooltip>

            ))
          }
        </Box>
      </Popover>
    </>
  )
}

export default KeepColorsSetting;