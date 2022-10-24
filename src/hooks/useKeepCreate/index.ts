import { Keep } from "../../models";
import { generateUid } from "../../helpers/generate-id";
import { useContext } from "react";
import { KeepContext } from "../../store/keep.context";

// Хук создание заметки
const useKeepCreate = ({ keep, onCreate = () => { } }: { keep: Omit<Keep, "id">, onCreate?: () => void }) => {
  const { addKeep } = useContext(KeepContext);

  const validateKeepInfo = (): boolean => {
    if (!keep.text?.trim() && !keep.title?.trim() && !keep.images.length) {
      return false;
    }
    return true;
  }

  const keepCreate = (): void => {
    if (!validateKeepInfo()) return
    const model: Keep = {
      id: generateUid(),
      ...keep,
      text: keep.text ? keep.text.replace(/<\/?[^>]+(>|$)/g, "") : "",
      title: keep.title ? keep.title.replace(/<\/?[^>]+(>|$)/g, "") : "",
    }
    addKeep(model);
    onCreate();
  }

  return keepCreate;
}

export default useKeepCreate;