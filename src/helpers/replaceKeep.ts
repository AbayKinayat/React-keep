export const replaceKeep = (value?: string, search?: string) => { // Добавление обводки и очистить мусорный код
    return value && search ? value.replace(/<\/?[^>]+(>|$)/g, "").replaceAll(search, `<span class="hightlight">${search}</span>`) : value;
}