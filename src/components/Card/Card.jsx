import React, { useState, useEffect } from 'react'; // Добавлен useEffect
import likeclick from "../../assets/img/likeclick.png";
import plus from "../../assets/img/plus.png"; 
import classes from "../Card/Card.module.css";
import like from "../../assets/img/like.png";

function Card({   bookmarks = [], id, onFavorite, imageUrl, title, shoponclick, onPlus, price, favorited = false, originalImageUrl, onRemoveBookmark,changeproblemfavorited }) { // Добавлен cartItems
  const [isAdded, setIsAdded] = useState(false);


  const isInBookmarks = bookmarks.some(item => item.id === id);
    const [favorites, setFavorites] = useState(favorited);
  useEffect(() => {
    setFavorites(isInBookmarks);
  }, [isInBookmarks]);

  const handleFavoriteClick = () => {

  if(favorites){
    onRemoveBookmark(id)
  }
  
  else{
    onFavorite({
      id: id,
      name: title,
      price: price,
      
      imageUrl:originalImageUrl,
    });
    
  }
    
  };

  const handlePlusClick = () => {
    onPlus({
      id: id,
      name: title,
      price: price,
      imageUrl:originalImageUrl,
    });
  setIsAdded(!isAdded)
  };

  return (
    <div className={classes.card}>
      <div className={classes.paddinglike}>
        <img
          src={favorites  ? likeclick : like}
          alt=""
          className={classes.likebtn}
          onClick={ handleFavoriteClick }
          style={{border: 'none'}}
        />
      </div>

      <img
        src={imageUrl}
        alt=""
        width={133}
        height={112}
        className={classes.greensneak}
      />
      <span className={classes.span1}>{title}</span>

      <div className={classes.priceandadd}>
        <div>
          <h4 className={classes.h42}>Цена:</h4>
          <span>{price}</span>
        </div>
        <div className={`${classes.plusbtn} ${classes.padding}`}>
          <img
            src={isAdded ? shoponclick : plus}
            alt=""
            className={classes.padding}
            onClick={handlePlusClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;