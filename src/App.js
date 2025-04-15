import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home";
import Menu from "./components/Pages/Menu/Menu";
import Reservation from "./components/Pages/Reservation";
import Events from "./components/Pages/Events";
import Contact from "./components/Pages/Contact/Contact";
import About from "./components/Pages/About";
import Admin from "./components/Pages/Admin";
import Footer from "./components/Footer/Footer";
import "./components/styling/custom.scss";

function App() {
  return (
    <>
    <div className="app-container">
      <Navigation />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="menu" element={<Menu />}/>
        <Route path="reservation" element={<Reservation />}/>
        <Route path="events" element={<Events />}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="about" element={<About />}/>
        <Route path="admin" element={<Admin />}/>
      </Routes>
      <Footer />
      <ToastContainer />
      </div>
    </>
  );
}

export default App;