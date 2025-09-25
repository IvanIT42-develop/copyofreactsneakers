import "./App.css";
import purchases from "./assets/img/purchases.png";
import like from "./assets/img/like.png";
import profile from "./assets/img/profile.png";
import green from "./assets/img/greenandwhite.png";
import plus from "./assets/img/plus.png";
import black from "./assets/img/black.png";
import blackandblue from "./assets/img/blackandblue.png";
import manycolor from "./assets/img/manycolor.png";
import onlysalat from "./assets/img/onlysalat.png";
import orangeandsalat from "./assets/img/orangeandsalat.png";
import white from "./assets/img/white.png";
import whiteandblack from "./assets/img/whiteandblack.png";
import yellow from "./assets/img/yellow.png";
import blackandred from "./assets/img/blackandred.png";
import blackandwhitenike from "./assets/img/blackandwhitenike.png";
import search from "./assets/img/search.png";
import Header from "./components/Header";
import shoponclick from "./assets/img/shoponclick.png";
import btnremove from "./assets/img/btn-remove.png";
import arrow from "./assets/img/arrow.png";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import box from "./assets/img/box.png";
import left from "./assets/img/left.png";
import { useEffect, useState } from "react";
import Bookmarks from "./components/bookmarks/bookmarks"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  initBookmarks,
  getBookmarks,
  addToBookmarks,
  removeFromBookmarks
} from "./components/localstorage/localstorage"
import axios from "axios";

const imageMap = {
  blackandwhitenike: blackandwhitenike,
  whiteandblack: whiteandblack,
  blackandblue: blackandblue,
  blackandred: blackandred,
  manycolor: manycolor,
  onlysalat: onlysalat,
  orangeandsalat: orangeandsalat,
  yellow: yellow,
  green: green,
  black: black,
  shoponclick: shoponclick,
};

function App() {
  const [saveBookMarks, setSaveBookMarks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [cardOpened, setCardOpened] = useState(false);
  const [bookmarksOpened, setBookmarksOpened] = useState(false);
  
  const loadBookmarks = () => {
    const bookmarks = getBookmarks();
    setSaveBookMarks(bookmarks || []);
  };

  useEffect(() => {
    axios.get("https://68c4305081ff90c8e61b84db.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
      
    axios.get("https://68c4305081ff90c8e61b84db.mockapi.io/card")
      .then((res) => {
        setCartItems(res.data);
      });

    loadBookmarks();
    initBookmarks();
  }, []);

  const onAddToCard = async (obj) => {
    try {
      const { data } = await axios.post(
        "https://68c4305081ff90c8e61b84db.mockapi.io/card",
        obj
      );
      setCartItems((prev) => [...prev, data]);
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
      alert("Не удалось добавить товар в корзину");
    }
  };

  const onAddToBookmarks = (obj) => {
    try {
      const success = addToBookmarks(obj);
      if (success) {
        const updatedBookmarks = getBookmarks();
        setSaveBookMarks(updatedBookmarks);
        console.log("Товар добавлен в закладки!");
      } else {
        console.log("Товар уже в закладках");
      }
    } catch (error) {
      console.error("Ошибка при добавлении в закладки:", error);
      alert("Не удалось добавить товар в закладки");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredItems = items.filter((item) => 
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const onRemoveItem = (id) => {
    axios.delete(`https://68c4305081ff90c8e61b84db.mockapi.io/card/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const onRemoveBookmark = (id) => {
    removeFromBookmarks(id);
    loadBookmarks();
  };

  return (
    <div className="divpapa">
      {bookmarksOpened ?
        <Bookmarks
          bookmarks={saveBookMarks}
          onRemoveBookmark={onRemoveBookmark}
          imageMap={imageMap}
        />:null
      }
 <BrowserRouter>
   <Routes>
        <Route path="/bookmarks" element={
         <Bookmarks></Bookmarks>
        }></Route>
   </Routes></BrowserRouter>
         {cardOpened && (
        <Drawer
          leftBtn={left}
          boxBtn={box}
          onRemoweDrawerItem={onRemoveItem}
          imageadd={imageMap}
          items={cartItems}
          onCloseCard={() => setCardOpened(false)}
        />
      )}
      
      <Header
        onClickCard={() => setCardOpened(true)}
        onClickLike={() => setBookmarksOpened(true)}
      />
      
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
              imageUrl={imageMap[item.imageUrl]}
              shoponclick={shoponclick}
              onPlus={() => onAddToCard(item)}
              onFavorite={() => onAddToBookmarks(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;