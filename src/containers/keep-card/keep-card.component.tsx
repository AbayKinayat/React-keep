import React, { useMemo } from 'react';
import { Card, Typography, CardContent, CardActionArea, CardActions } from "@mui/material";

import KeepImageList from '../keep-image-list/keep-image-list.component';
import KeepCardActions from '../keep-card-actions/keep-card-actions.component';
import type { Keep } from '../../models'
import { generateUid } from '../../helpers/generate-id';
import { replaceKeep } from '../../helpers/replace-keep';
import "./keep-card.styles.scss";

interface KeepCardProps {
  keep: Keep,
  editable?: boolean,
  search?: string,
  editKeep?: (keep: Keep) => void
  onSelectKeep?: (keep: Keep) => void
}

// Карточка заметки
const KeepCard: React.FC<KeepCardProps> = ({ keep, editable, search, editKeep = () => { }, onSelectKeep = () => { } }) => {

  // Добавить картинку
  const imageAddHandler = (image: string): void => {
    editKeep({
      ...keep,
      images: [...keep.images, { id: generateUid(), img: image }]
    })
  }

  // Изменить цвет заметки
  const colorChangeHandler = (color: string) => {
    editKeep({
      ...keep,
      color: color
    })
  }

  // Реализация обводки поиска
  const keepTitle = useMemo(() => {
    return replaceKeep(keep.title, search);
  }, [search, keep]);
  const keepText = useMemo(() => {
    return replaceKeep(keep.text, search);
  }, [search, keep]);

  return (
    <Card
      variant='outlined'
      className="keep-card"
      sx={{
        borderRadius: "10px",
        background: keep.color
      }}
    >
      {
        keep.images.length === 1 ?
          <img
            src={keep.images[0].img}
            width="100%"
            onClick={onSelectKeep.bind(null, keep)}
          /> :
          <KeepImageList
            images={keep.images}
            onClick={onSelectKeep.bind(null, keep)}
          />
      }
      {
        (keep.title || keep.text) &&
        <CardContent
          onClick={onSelectKeep.bind(null, keep)}
        >
          {
            keep.title &&
            <Typography variant="body1" fontWeight={700}>
              <span dangerouslySetInnerHTML={{ __html: keepTitle || "" }}>
              </span>
            </Typography>
          }
          {
            keep.text &&
            <Typography variant='h6' fontWeight={400}>
              <span dangerouslySetInnerHTML={{ __html: keepText || "" }}>
              </span>
            </Typography>
          }
        </CardContent>
      }
      <div className="keep-card__actions">
        <CardActions>
          <KeepCardActions
            keep={keep}
            imageOnAdd={imageAddHandler}
            colorOnChange={colorChangeHandler}
          />
        </CardActions>
      </div>
    </Card>
  )
}

export default KeepCard