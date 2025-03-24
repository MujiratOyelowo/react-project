import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home";
import Menu from "./components/Pages/Menu";
import Reservation from "./components/Pages/Reservation";
import Contact from "./components/Pages/Contact";
import About from "./components/Pages/About";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="menu" element={<Menu />}/>
        <Route path="reservation" element={<Reservation />}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="about" element={<About />}/>
      </Routes>
      <Header />
    </>
  );
}

export default App;
