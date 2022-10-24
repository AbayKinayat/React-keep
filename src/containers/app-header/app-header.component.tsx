import React, { useContext } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
;
import { Search } from '../../components';
import AppSidebarContext from '../../store/app-sidabar.context';
import { KeepContext } from '../../store/keep.context';

const AppHeader: React.FC = () => {
  const { openSidebar, closeSidebar, isOpen } = useContext(AppSidebarContext);
  const { setSearchValue, search } = useContext(KeepContext)

  // Закрыть сайдбар
  const closeSidebarHandler = () => {
    closeSidebar(48);
  }

  // Открыть сайдбар
  const openSidebarHandler = () => {
    openSidebar(270);
  }

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  // Очистить глоабльный поиск
  const resetSearch = () => {
    setSearchValue("");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="white"
        elevation={1}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ minWidth: 232, pr: 4 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={isOpen ? closeSidebarHandler : openSidebarHandler}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
            >
              Keep
            </Typography>
          </Box>
          <Box flexGrow={1}>
            <Search
              onChange={searchChangeHandler}
              resetFindRequest={resetSearch}
              value={search}
            />
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppHeader