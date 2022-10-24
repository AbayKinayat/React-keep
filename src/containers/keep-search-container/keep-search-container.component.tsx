import React, { useContext, useState } from 'react';
import { Toolbar } from '@mui/material';
import classNames from "classnames";

import KeepDialogInfo from '../keep-dialog-info/keep-dialog-info.component';
import KeepList from '../keep-list/keep-list.component';
import AppSidebarContext from '../../store/app-sidabar.context';
import { KeepContext } from '../../store/keep.context';
import { useKeepSelect } from '../../hooks';
import type { Keep } from '../../models';
import "./keep-search-container.styles.scss";

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