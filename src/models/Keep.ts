export interface KeepImage {
  readonly id: string | number;
  img: string;
}

// Заметка
export interface Keep {
  readonly id: string | number;
  title?: string;
  text?: string;
  color?: string;
  images: KeepImage[] // изображение заметки
}
