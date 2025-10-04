
import classes from "../bookmarks/classes.module.css";
import { Link } from "react-router-dom";
import CopyOfCard from "../copyOfCard/copyOfCard";
import shoponclick from "../../assets/img/shoponclick.png";

function Bookmarks({ bookmarks = [], onRemoveBookmark, imageMap, onAddToBookmarks, onAddToCard }) {
  return (
    <div>
      <div className={classes.h1andreturn}>
        <h2>Мои закладки</h2>
        <Link to="/">
          <button>Вернуться назад</button>
        </Link>
      </div>
      {bookmarks.map((item) => (
        <div key={item.id} className="bookmark-item">
          <CopyOfCard
            key={item.id}
            id={item.id} // ← ПЕРЕДАЙТЕ ID
            title={item.name}
            price={item.price}
            imageUrl={imageMap[item.imageUrl]}
            shoponclick={shoponclick}
            onPlus={() => onAddToCard(item)}
            onFavorite={() => onAddToBookmarks(item)}
            onRemoveBookmark={onRemoveBookmark}
            originalImageUrl={item.imageUrl} // ← ПЕРЕДАЙТЕ originalImageUrl
            favorited={true}
          />
          <button onClick={() => onRemoveBookmark(item.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}

export default Bookmarks;