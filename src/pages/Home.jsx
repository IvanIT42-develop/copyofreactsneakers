import React, { useEffect } from 'react'
import Card from '../components/Card/Card'
import { useState } from 'react';
import search from "../assets/img/search.png";
import axios from 'axios';
import btnremove from "../assets/img/btn-remove.png";

const Home = ({ 
  items, 
  onAddToCard, 
  onAddToBookmarks, 
  imageMap, 
  shoponclick 
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
                    <Card
                        key={item.id}
                        title={item.name}
                        price={item.price}
                        imageUrl={imageMap[item.imageUrl]} // ✅ Теперь imageMap доступен
                        shoponclick={shoponclick} // ✅ shoponclick доступен
                        onPlus={() => onAddToCard(item)} // ✅ onAddToCard доступен
                        onFavorite={() => onAddToBookmarks(item)} // ✅ onAddToBookmarks доступен
                        favorited ={false}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;