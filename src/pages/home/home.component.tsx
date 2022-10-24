import React, { useContext, useState } from 'react'

import { KeepCreate, KeepDialogInfo, KeepList } from '../../containers'
import { useKeepSelect } from '../../hooks';
import { Keep } from '../../models';
import { KeepContext } from '../../store/keep.context'


const Home: React.FC = () => {
  const { keeps, editKeep } = useContext(KeepContext);
  const [keepDialogIsOpen, setKeepDialogIsOpen] = useState(false);
  const [selectedKeep, onSelectKeepHandler] = useKeepSelect();

  const closeKeepDialog = () => {
    setKeepDialogIsOpen(false);
  }

  const selectKeepHandler = (keep: Keep) => {
    setKeepDialogIsOpen(true);
    onSelectKeepHandler(keep);
  }

  React.useEffect(() => {
    console.log(keeps)
  }, [keeps])

  return (
    <div>
      <KeepCreate />
      <KeepList
        keeps={keeps}
        editKeep={editKeep}
        onSelectKeep={selectKeepHandler}
        editable
      />
      <KeepDialogInfo
        isOpen={keepDialogIsOpen}
        closeDialog={closeKeepDialog}
        keep={selectedKeep}
      />
    </div>
  )
}

export default Home