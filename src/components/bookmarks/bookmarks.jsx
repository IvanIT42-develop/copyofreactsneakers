function Bookmarks({ bookmarks = [], onRemoveBookmark, imageMap }) {
  return (
    <div>
      <h2>Мои закладки</h2>
      {bookmarks.map((item) => (
        <div key={item.id} className="bookmark-item">
          <img 
            src={imageMap[item.imageUrl]} // ← используем imageMap для получения изображения
            alt={item.name} 
            width={70} 
            height={70} 
          />
          <h4>{item.name}</h4>
          <p>{item.price}</p>
          <button onClick={() => onRemoveBookmark(item.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}
export default Bookmarks