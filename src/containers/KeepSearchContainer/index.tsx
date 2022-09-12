import React, { useContext, useState } from 'react';
import { Toolbar } from '@mui/material';
import classNames from "classnames";

import KeepDialogInfo from '../KeepDialogInfo';
import KeepList from '../KeepList';
import AppSidebarContext from '../../store/AppSidebarContext';
import { KeepContext } from '../../store/KeepContext';
import { useKeepSelect } from '../../hooks';
import type { Keep } from '../../models';
import "./KeepSearchContainer.scss";

// Контейнер поиска заметок 
const KeepSearchContainer: React.FC = () => {
  const { sidebarWidth } = useContext(AppSidebarContext);
  const { filteredKeeps, search, editKeep } = useContext(KeepContext);
  const [keepDialogIsOpen, setKeepDialogIsOpen] = useState(false);
  const [selectedKeep, onSelectKeepHandler] = useKeepSelect();

  const closeKeepDialog = () => {
    setKeepDialogIsOpen(false);
  }

  const selectKeepHandler = (keep: Keep) => {
    setKeepDialogIsOpen(true);
    onSelectKeepHandler(keep);
  }

  return (
    <>
      <div
        className={classNames("keep-search-container", {
          "keep-search-container--visible": search
        })}
        style={{
          height: "100%",
          transition: ".3s",
          paddingLeft: sidebarWidth + 100
        }}
      >
        <Toolbar />
        <KeepList
          keeps={filteredKeeps}
          search={search}
          editKeep={editKeep}
          emptyText="Ничего не найдено"
          onSelectKeep={selectKeepHandler}
          editable
        />
        <KeepDialogInfo
          isOpen={keepDialogIsOpen}
          closeDialog={closeKeepDialog}
          keep={selectedKeep}
        />
      </div>
    </>
  )
}

export default KeepSearchContainer;