import { createContext, useMemo, useState } from "react";
import type { Keep } from "../models";

export const KeepContext = createContext<{
  keeps: Keep[],
  filteredKeeps: Keep[],
  search: string,
  addKeep: (keep: Keep) => void,
  deleteKeep: (id: Keep["id"]) => void,
  editKeep: (keep: Keep) => void
  setSearchValue: (text: string) => void
}>({
  keeps: [],
  filteredKeeps: [],
  search: "",
  addKeep: () => { },
  deleteKeep: () => { },
  editKeep: () => { },
  setSearchValue: () => { }
});

interface KeepContentProviderProps {
  children: React.ReactNode
}

const KeepContextProvider: React.FC<KeepContentProviderProps> = ({ children }) => {
  const [search, setSearch] = useState("");
  const [keeps, setKeeps] = useState<Keep[]>([

  ]);
  const filteredKeeps = useMemo(() => {
    return keeps.filter(keep => {
      return keep.text?.toLowerCase().includes(search.toLowerCase()) || keep.title?.toLowerCase().includes(search.toLowerCase());
    })
  }, [keeps, search])

  const addKeep = (keep: Keep) => {
    setKeeps([
      ...keeps,
      keep
    ]);
  }

  const deleteKeep = (id: Keep["id"]): void => {
    setKeeps(
      keeps.filter(keep => keep.id !== id)
    );
  }

  const editKeep = (keep: Keep): void => {
    setKeeps(
      [...keeps.map(item => item.id === keep.id ? keep : item)]
    )
  }

  const setSearchValue = (text: string) => {
    setSearch(text);
  }

  return (
    <KeepContext.Provider value={{
      keeps,
      search,
      deleteKeep,
      addKeep,
      editKeep,
      setSearchValue,
      filteredKeeps
    }}>
      {children}
    </KeepContext.Provider>
  )
}

export default KeepContextProvider;