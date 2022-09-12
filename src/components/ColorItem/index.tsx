import React from 'react';
import classNames from "classnames";
import Box from "@mui/material/Box";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import "./ColorItem.scss";

interface ColorItemProps {
  title: string;
  color: string;
  bordered?: boolean;
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 *  Компонент цвет 
*/
const ColorItem: React.FC<ColorItemProps> = ({
  title,
  color,
  selected,
  bordered,
  className,
  style = {},
  onClick = () => { }
}) => {
  return (
    <Box
      className={
        classNames("color-item", className, {
          "color-item--active": selected,
          "color-item--bordered": bordered
        })
      }
      sx={{
        background: color,
        border: `1px solid ${color}`,
        ...style
      }}
      onClick={onClick}
    >
      {
        selected &&
        <Box className="color-item__select">
          <CheckOutlinedIcon sx={{ color: "#fff", fontSize: "16px" }} />
        </Box>
      }
    </Box>
  )
}

export default ColorItem