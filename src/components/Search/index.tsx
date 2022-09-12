import React, { useState } from 'react';
import { IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import classNames from "classnames";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import "./Search.scss";

interface SearchProps {
  placeholder?: string,
  resetFindRequest?: () => void,
  maxWidth?: number | string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}

/**
 *  Компонент поиск без своей логики
*/
const Search: React.FC<SearchProps> = ({
  placeholder = "Поиск",
  resetFindRequest = () => { },
  maxWidth = 722,
  onChange = () => { },
  value
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const focusHandler = () => {
    console.log("focused")
    setIsFocused(true);
  }

  const blurHandler = () => {
    setIsFocused(false);
  }

  return (
    <Paper
      component="form"
      className={classNames("app-search", { "app-search--focused": isFocused })}
      sx={{ maxWidth: maxWidth }}
      elevation={isFocused ? 2 : 0}
    >
      <Tooltip title="Поиск">
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <InputBase
        value={value}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'Search keeps' }}
        sx={{ ml: 1, flex: 1, color: "#6f6f70" }}
        onFocus={focusHandler}
        onBlur={blurHandler}
        onChange={onChange}
      />
      {
        resetFindRequest && value &&
        <Tooltip title="Удалить поисковой запрос">
          <IconButton
            sx={{ p: '10px' }}
            aria-label="reset-request"
            onClick={resetFindRequest}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      }

    </Paper>
  )
}

export default Search