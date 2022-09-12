import { useState, } from "react";

import { generateUid } from "../../helpers/generateId";
import type { KeepImage } from "../../models/Keep";

// Хук заметки
const useKeep = () => {
  const [keepTitle, setKeepTitle] = useState("");
  const [keepText, setKeepText] = useState("");
  const [keepColor, setKeepColor] = useState("#ffffff");
  const [keepImages, setKeepImages] = useState<KeepImage[]>([]);

  const colorChangeHandler = (color: string): void => {
    setKeepColor(color);
  }

  const keepChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;

    switch (name) {
      case "title":
        setKeepTitle(event.target.value);
        break
      case "text":
        setKeepText(event.target.value);
        break
    }
  }

  const setState = (stateName: string, value: any): void => {
    switch (stateName) {
      case "title":
        setKeepTitle(value);
        break;
      case "text":
        setKeepText(value);
        break;
      case "color":
        setKeepColor(value);
        break;
      case "images":
        setKeepImages(value);
    }
  }

  const keepImageAddHandler = (image: KeepImage["img"]): void => {
    setKeepImages([...keepImages, { id: generateUid(), img: image }]);
  }

  const keepImageDeleteHandler = (id: KeepImage["id"]) => {
    setKeepImages(keepImages.filter(keep => keep.id !== id));
  }

  const resetKeep = () => {
    setKeepText("");
    setKeepTitle("");
    setKeepImages([]);
    setKeepColor("#ffffff");
  }

  return {
    keep: {
      title: keepTitle,
      text: keepText,
      color: keepColor,
      images: keepImages,
    },
    colorChangeHandler,
    keepChangeHandler,
    keepImageAddHandler,
    keepImageDeleteHandler,
    resetKeep,
    setState
  }
}

export default useKeep;