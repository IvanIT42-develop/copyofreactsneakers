import classes from "../bookmarks/classes.module.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import shoponclick from "../../assets/img/shoponclick.png";
function Bookmarks({ bookmarks = [], onRemoveBookmark, imageMap }) {
  return (
    <div>
      <div className={classes.h1andreturn}> {/* Исправили clasess на classes */}
        <h2>Мои закладки</h2>
        <Link to="/">
          <button>Вернуться назад</button>
        </Link>
      </div>
      {bookmarks.map((item) => (
        <div key={item.id} className="bookmark-item">
        
               <Card
                        key={item.id}
                        title={item.name}
                        price={item.price}
                        imageUrl={imageMap[item.imageUrl]} // ✅ Теперь imageMap доступен
                        shoponclick={shoponclick} // ✅ shoponclick доступен
                        onPlus={() => onAddToCard(item)} // ✅ onAddToCard доступен
                        favorited={true}
                        onFavorite={() => onAddToBookmarks(item)} // ✅ onAddToBookmarks доступен
                    />
         
          <button onClick={() => onRemoveBookmark(item.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}

export default Bookmarks