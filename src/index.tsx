import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./plugins/mui.plugin";

import App from './App';
import { AppSidebarProvider } from './store/AppSidebarContext';
import './index.css';
import KeepContextProvider from './store/KeepContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <KeepContextProvider>
        <AppSidebarProvider>
          <App />
        </AppSidebarProvider>
      </KeepContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
