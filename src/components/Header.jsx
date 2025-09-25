import "../App.css";
import purchases from "../assets/img/purchases.png";
import like from "../assets/img/like.png";
import profile from "../assets/img/profile.png";
import green from "../assets/img/greenandwhite.png";
import plus from "../assets/img/plus.png";
import black from "../assets/img/black.png";
import blackandblue from "../assets/img/blackandblue.png";
import manycolor from "../assets/img/manycolor.png";
import onlysalat from "../assets/img/onlysalat.png";
import orangeandsalat from "../assets/img/orangeandsalat.png";
import white from "../assets/img/white.png";
import whiteandblack from "../assets/img/whiteandblack.png";
import yellow from "../assets/img/yellow.png";
import blackandred from "../assets/img/blackandred.png";
import blackandwhitenike from "../assets/img/blackandwhitenike.png";
import search from "../assets/img/search.png";

import shoponclick from "../assets/img/shoponclick.png";
import btnremove from "../assets/img/btn-remove.png";
import arrow from "../assets/img/arrow.png";
import Card from "./Card/Card";
import headerSneakers from "../assets/img/headersneakers.png";
import { Route,Routes,Router,BrowserRouter, Link } from "react-router-dom";
function Header(props) {
  return (
    <div>
      <header className="header1">
        <div className="headerinfo">
          <img src={headerSneakers} alt="" className="img1" />
          <div className="caption">
            <h3 className="h31">REACT SNEAKERS</h3>{" "}
            <span>Магазин лучшиx кроссовок</span>
          </div>
        </div>

  

        <ul className="manyicons">
          <li>
            <img
              onClick={props.onClickCard}
              src={purchases}
              alt=""
              className="captionicons a"
            />
            <span>1205руб</span>
          </li>
          <li>
           
          <BrowserRouter>
            <Link to="/bookmarks" onClick={props.onClickLike} >
            <img src={like} alt="Закладки" className="captionicons" />
          </Link>
        <Routes>
          <Route path="/book" element={
            <div>eker</div>
          }></Route>
          </Routes></BrowserRouter>
          <span>Закладки</span>
          </li>
          <li>
            <img src={profile} alt="" className="captionicons" />
            <span>Профиль</span>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;