// Menu.js
import React from "react";
import MenuSections from "./MenuSections";

function Menu() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#8B0000", textAlign: "center" }}>Menu</h1>
      <MenuSections />
    </div>
  );
}

export default Menu;
