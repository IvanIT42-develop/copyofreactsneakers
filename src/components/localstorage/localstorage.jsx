const BOOKMARKS_KEY = "sneakers-bookmarks";

// Инициализация закладок
export const initBookmarks = () => {
  if (!localStorage.getItem(BOOKMARKS_KEY)) {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([]));
  }
};

// Получить все закладки
export const getBookmarks = () => {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]");
  } catch (error) {
    console.error("Ошибка получения закладок:", error);
    return [];
  }
};

// Добавить в закладки
export const addToBookmarks = (item) => {
  try {
    const bookmarks = getBookmarks();

    // Проверяем, нет ли уже этого товара в закладках
    if (!bookmarks.some((bookmark) => bookmark.id === item.id)) {
      const newBookmarks = [...bookmarks, { ...item, isBookmarked: true }];
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
      return true; // Успешно добавлено
    }
    return false; // Уже в закладках
  } catch (error) {
    console.error("Ошибка добавления в закладки:", error);
    return false;
  }
};

// Удалить из закладок
export const removeFromBookmarks = (itemId) => {
  try {
    const bookmarks = getBookmarks();
    const newBookmarks = bookmarks.filter((item) => item.id !== itemId);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    return true;
  } catch (error) {
    console.error("Ошибка удаления из закладок:", error);
    return false;
  }
};

// Проверить, есть ли товар в закладках
export const isBookmarked = (itemId) => {
  const bookmarks = getBookmarks();
  return bookmarks.some((item) => item.id === itemId);
};

// Очистить все закладки
export const clearBookmarks = () => {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([]));
};

// Получить количество закладок
export const getBookmarksCount = () => {
  return getBookmarks().length;
};

// Обновить закладку
export const updateBookmark = (itemId, updatedData) => {
  try {
    const bookmarks = getBookmarks();
    const newBookmarks = bookmarks.map((item) =>
      item.id === itemId ? { ...item, ...updatedData } : item
    );
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    return true;
  } catch (error) {
    console.error("Ошибка обновления закладки:", error);
    return false;
  }
};