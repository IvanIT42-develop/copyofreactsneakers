import like from "../../assets/img/like.png";
import React, { useState, useEffect } from 'react';
import likeclick from "../../assets/img/likeclick.png";
import plus from "../../assets/img/plus.png"; 
import classes from "../Card/Card.module.css";

function CopyOfCard({ 
  bookmarks = [], 
  id, 
  onFavorite, 
  imageUrl, 
  title, 
  shoponclick, 
  onPlus, 
  price, 
  favorited = false, 
  originalImageUrl, 
  onRemoveBookmark,
  onAddToBookmarks 
}) { // ← ДОБАВЬТЕ ФИГУРНЫЕ СКОБКИ ДЛЯ ДЕСТРУКТУРИЗАЦИИ

  const onFavoritclick = () => {
    onFavorite({
      id: id,
      name: title,
      price: price,
      imageUrl: originalImageUrl,
    });
  };

  return (
    <div className={classes.card}>
      <div className={classes.paddinglike}>
        <img
          src={likeclick}
          alt=""
          className={classes.likebtn}
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
          {/* Можно добавить кнопку плюса если нужно */}
        </div>
      </div>
    </div>
  );
}

export default CopyOfCard;