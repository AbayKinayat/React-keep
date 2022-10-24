import React, { useContext, useState, useEffect } from 'react';
import { List, Drawer, Toolbar } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

import { AppListItem } from '../../components';
import AppSidebarContext from '../../store/app-sidabar.context';
import { routes } from '../../routes';

// Сайдбар
const AppSidebar: React.FC = () => {
  const { isOpen, sidebarWidth } = useContext(AppSidebarContext);
  const [listStyle, setListStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (isOpen) {
      setListStyle({
        ...listStyle,
        paddingLeft: 12,
        marginLeft: 0,
        borderRadius: "0 25px 25px 0"
      })
    }

    if (!isOpen) {
      setListStyle({
        ...listStyle,
        paddingLeft: 0,
        marginLeft: 12,
        borderRadius: "25px"
      })
    }
  }, [isOpen])

  return (
    <Drawer
      sx={{
        width: sidebarWidth + 12,
        transition: ".3s",
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          transition: ".3s",
          width: sidebarWidth + 12,
          boxSizing: 'border-box',
          border: "none"
        },
      }}
      variant="persistent"
      anchor="left"
      open
    >
      <Toolbar />
      <List>
        <AppListItem
          text="Заметки"
          icon={
            <LightbulbOutlinedIcon />
          }
          to={routes.home.path}
          style={listStyle}
        />
        <AppListItem
          text="Тестовая страница"
          icon={
            <LightbulbOutlinedIcon />
          }
          to="/test"
        />
      </List>
    </Drawer>
  )
}

export default AppSidebar