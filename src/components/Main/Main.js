import React from "react";
import Header from "../Header/Header";
import Project from "../Project/Project";
import Promo from "../Promo/Promo";
import Technologies from "../Technologies/Technologies";

function Main() {
  return (
    <div className="main">
      <Header isMainPage={true} />
      <Promo />
      <Project />
      <Technologies />
    </div>
  )
}

export default Main;