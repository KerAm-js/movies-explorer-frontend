import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Project from "../Project/Project";
import Promo from "../Promo/Promo";
import Student from "../Student/Student";
import Technologies from "../Technologies/Technologies";

function Main() {
  return (
    <div className="main">
      <Header isMainPage={true} />
      <Promo />
      <Project />
      <Technologies />
      <Student />
      <Footer />
    </div>
  )
}

export default Main;