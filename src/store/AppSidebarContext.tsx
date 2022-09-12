import { createContext, useState } from "react";

interface AppSidebarProviderProps {
  children: React.ReactNode
}

interface AppSidebarState {
  isOpen: boolean,
  sidebarWidth: number,
  openSidebar: (width: number) => void,
  closeSidebar: (width: number) => void,
  changeSidebarWidth: (width: number) => void
}

const AppSidebarContext = createContext<AppSidebarState>({
  isOpen: true,
  sidebarWidth: 270,
  openSidebar: () => { },
  closeSidebar: () => { },
  changeSidebarWidth: () => { }
});

export const AppSidebarProvider: React.FC<AppSidebarProviderProps> = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(270);

  const openSidebar = (width: number): void => {
    setIsOpen(true);
    setSidebarWidth(width);
  }
  const closeSidebar = (width: number): void => {
    setIsOpen(false);
    setSidebarWidth(width);
  }
  const changeSidebarWidth = (width: number) => {
    setSidebarWidth(width);
  }

  return (
    <AppSidebarContext.Provider value={{
      isOpen,
      sidebarWidth,
      openSidebar,
      closeSidebar,
      changeSidebarWidth
    }}>
      {children}
    </AppSidebarContext.Provider>
  )
}

export default AppSidebarContext;