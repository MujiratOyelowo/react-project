import React from "react";
import MenuSections from "./MenuSections";

function Menu() {
  return (
    <div style={{ padding: "2rem" }}>
      <div className="heading-line">
        <h1 className="menu-header">Menu</h1>
      </div>
      <MenuSections />
    </div>
  );
}

export default Menu;