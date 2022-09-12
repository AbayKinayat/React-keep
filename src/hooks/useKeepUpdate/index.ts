import { useContext } from "react";

import { KeepContext } from "../../store/KeepContext";
import type { Keep } from "../../models";

// Хук редактирование заметки
const useKeepUpdate = ({ keep, onEdit = () => {} }: { keep: Keep, onEdit?: () => void }) => {
  const { editKeep } = useContext(KeepContext);

  const keepEdit = () => {
    editKeep(keep);
    onEdit();
  }

  return keepEdit;
}

export default useKeepUpdate;