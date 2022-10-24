import React, { useContext } from 'react';
import { Box } from '@mui/material';

import { KeepColorsSetting, KeepImagesSetting } from '..';
import { generateUid } from '../../helpers/generate-id';
import type { Keep } from '../../models';

interface KeepCardActionsProps {
  keep: Keep,
  imageOnAdd?: (image: string) => void,
  colorOnChange?: (color: string) => void
}

const keepColorSettingId = generateUid();
const keepImagesSettingId = generateUid();

// Компонент действии карточки заметки
const KeepCardActions: React.FC<KeepCardActionsProps> = ({
  keep,
  imageOnAdd = () => { },
  colorOnChange = () => { }
}) => {

  return (
    <Box display="flex">
      <KeepColorsSetting
        keepSettingId={keepColorSettingId}
        onChange={colorOnChange}
      />
      <KeepImagesSetting
        keepSettingId={keepImagesSettingId}
        onImageAdd={imageOnAdd}
      />
    </Box>
  )
}

export default KeepCardActions