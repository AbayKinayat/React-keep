import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Toolbar from "@mui/material/Toolbar";

import { Home } from './pages';
import { AppHeader, AppSidebar, KeepSearchContainer } from './containers';
import AppSidebarContext from './store/AppSidebarContext';
import { routes } from './routes';
import './App.css';

function App() {
  const { sidebarWidth } = useContext(AppSidebarContext);

  return (
    <div className="App">
      {/* Шапка */}
      <AppHeader />
      {/* Сайдбар */}
      <AppSidebar />
      <Toolbar />
      {/* Контейнер поиска заметок */}
      <KeepSearchContainer />
      <div
        style={{
          height: "100%",
          transition: ".3s",
          paddingLeft: sidebarWidth + 100
        }}
      >
        <Routes>
          <Route path={routes.home.path} element={<Home />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
