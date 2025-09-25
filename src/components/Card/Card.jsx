import React, { useState } from 'react';
import likeclick from "../../assets/img/likeclick.png";
import plus from "../../assets/img/plus.png"; 
import classes from "../Card/Card.module.css";
import like from "../../assets/img/like.png";

function Card({ id, onFavorite, imageUrl, title, shoponclick, onPlus, price }) {
  const [isAdded, setIsAdded] = useState(false);
  const [favorites, setFavorites] = useState(false);

  const handleFavoriteClick = () => {
    setFavorites(!favorites);
    // Вызываем onFavorite только при клике
    onFavorite({
      id: id, // добавляем id
      name: title,
      price: price,
      imageUrl: imageUrl,
    });
  };

  const handlePlusClick = () => {
    onPlus({
      id: id, // добавляем id
      name: title,
      price: price,
      imageUrl: imageUrl,
    });
    setIsAdded(!isAdded);
  };

  return (
    <div className={classes.card}>
      <div className={classes.paddinglike}>
        <img
          src={favorites ? likeclick : like}
          alt=""
          className={classes.likebtn}
          onClick={handleFavoriteClick}
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
          <span>{price}</span> {/* Используем переданную цену */}
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