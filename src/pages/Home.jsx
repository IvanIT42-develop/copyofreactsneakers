import React, { useEffect } from 'react'
import Card from '../components/Card/Card'
import { useState } from 'react';
import search from "../assets/img/search.png";
import axios from 'axios';
import btnremove from "../assets/img/btn-remove.png";
import CopyOfCard from '../components/copyOfCard/copyOfCard';
const Home = ({ 
  items, 
  onAddToCard, 
  onAddToBookmarks, 
 imageMap, 
  shoponclick,
    bookmarks,
}) => { // ✅ Получаем все необходимые пропсы
    const [searchValue, setSearchValue] = useState('');
    
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredItems = items.filter((item) => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="content">
            <div className="zagolovokwithserach">
                <h1 className="h12">
                    {searchValue
                        ? `Поиск по запросу:"${searchValue}"`
                        : "Все кроссовки"}
                </h1>
                <div className="searchinput">
                    <img src={search} alt="" className="search" />
                    {searchValue && (
                        <img
                            src={btnremove}
                            alt=""
                            style={{ position: "absolute", right: 45, bottom: 506, cursor: "pointer" }}
                            onClick={() => setSearchValue("")}
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Поиск..."
                        className="input1"
                        onChange={onChangeSearchInput}
                        value={searchValue}
                    />
                </div>
            </div>
            
            <div className="content1">
                {filteredItems.map((item) => (
                  // В вашем основном компоненте (Home, App и т.д.)
<Card
  key={item.id}
  id={item.id}
  title={item.name}
  price={item.price}
  imageUrl={imageMap[item.imageUrl]}
  shoponclick={shoponclick}
  onPlus={onAddToCard}
  onFavorite={onAddToBookmarks}
originalImageUrl={item.imageUrl}
      bookmarks={bookmarks}
/>

                ))}
            </div>
        </div>
    )
}

export default Home;