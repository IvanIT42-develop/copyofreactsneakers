import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./components/Header"
import  Bookmarks from "./components/bookmarks/bookmarks"
import Home from "./pages/Home"
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
import shoponclick from "./assets/img/shoponclick.png";
import Drawer from "./components/Drawer"
import {
  initBookmarks,
  getBookmarks,
  addToBookmarks,
  removeFromBookmarks
} from "./components/localstorage/localstorage"; // ← ДОБАВЬТЕ ЭТОТ ИМПОРТ
function App() {
  const [saveBookMarks, setSaveBookMarks] = useState([]);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cardOpened, setCardOpened] = useState(false);
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
  const loadBookmarks = () => {
    const bookmarks = getBookmarks();
    setSaveBookMarks(bookmarks || []);
  };
    const onRemoveBookmark = (id) => {
    removeFromBookmarks(id);
    loadBookmarks();
  };
  useEffect(() => {
    axios.get("https://68c4305081ff90c8e61b84db.mockapi.io/items")
      .then((res) => setItems(res.data));
      
    axios.get("https://68c4305081ff90c8e61b84db.mockapi.io/card")
      .then((res) => setCartItems(res.data));

    loadBookmarks();
    initBookmarks();
  }, []);

const onAddToCard = async (obj) => {
    try {
        // Сначала проверяем в текущем состоянии
        const existingItem = cartItems.find(item => 
            item.parentId === obj.id || 
            item.name === obj.name
        );

        if (existingItem) {
            // Удаляем
            await axios.delete(`https://68c4305081ff90c8e61b84db.mockapi.io/card/${existingItem.id}`);
            setCartItems(prev => prev.filter(item => item.id !== existingItem.id));
        } else {
            // Добавляем
            const itemToSave = {
                ...obj,
                parentId: obj.id // сохраняем оригинальный ID
            };
            const { data } = await axios.post(
                "https://68c4305081ff90c8e61b84db.mockapi.io/card",
                itemToSave
            );
            setCartItems(prev => [...prev, data]);
        }
    } catch (error) {
        console.error("Ошибка:", error);
    }
};  const onAddToBookmarks = (obj) => {
     

 try{
     addToBookmarks(obj);
    loadBookmarks();
 }
 catch{
console.log("Не удалось доабавить в фавориты")
 }
  };  const onRemoveItem = (id) => {
    axios.delete(`https://68c4305081ff90c8e61b84db.mockapi.io/card/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="divpapa">
        {cardOpened && (
          <Drawer
            items={cartItems}
            onRemoweDrawerItem={onRemoveItem}
            onCloseCard={() => setCardOpened(false)}
            imageMap={imageMap}
          />
        )}
        
        <Header onClickCard={() => setCardOpened(true)} />
        
        <Routes>
          <Route path="/bookmarks" element={
            <Bookmarks
              bookmarks={saveBookMarks}
              onRemoveBookmark={onRemoveBookmark}
              imageMap={imageMap}
               onAddToBookmarks={onAddToBookmarks} // ← передайте эту функцию
    onAddToCard={onAddToCard} // ← и эту функцию
            />
          } />
          
       
         
        </Routes>
         <Routes>
               <Route path="/" element={
            <Home 
              items={items}
              onAddToCard={onAddToCard}
              onAddToBookmarks={onAddToBookmarks}
              imageMap={imageMap}
              shoponclick={shoponclick}
              cartItems={cartItems}
               onRemoveBookmark={onRemoveBookmark}
               bookmarks={saveBookMarks}
            />
            
          } />
          </Routes>
      </div>
    </BrowserRouter>)}
  export default App