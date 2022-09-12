import { useState } from "react";
import type { Keep } from "../../models";

// Хук выбор заметки
const useKeepSelect = (): [Keep | null, (keep: Keep) => void] => {
  const [selectedKeep, setSelectedKeep] = useState<Keep | null>(null);

  const onSelectKeepHandler = (keep: Keep): void => {
    setSelectedKeep(keep);
  }

  return [selectedKeep, onSelectKeepHandler];
}

export default useKeepSelect;