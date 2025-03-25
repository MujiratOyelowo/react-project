// MenuPage.js
import React, { useState } from "react";

function MenuPage() {
  // State to track which menu is currently displayed
  const [activeCategory, setActiveCategory] = useState("");

  // Sample menu data
  const nepaleseMenu = ["Dal Bhat", "Momo", "Chicken Sekuwa"];
  const nigerianMenu = ["Jollof Rice", "Egusi Soup", "Suya"];
  const fusionMenu = ["Plantain Momo", "Spiced Potato Cutlet", "Tandoori Pepper Chicken"];

  // Handler function for category clicks
  const handleCategoryClick = (category) => {
    // If user clicks the same category again, toggle it off
    setActiveCategory((prev) => (prev === category ? "" : category));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#8B0000" }}>Menu</h1>

      {/* Category Titles */}
      <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
        <span
          style={{ cursor: "pointer", color: activeCategory === "Nepalese" ? "#DAA520" : "#8B0000" }}
          onClick={() => handleCategoryClick("Nepalese")}
        >
          Nepalese Cuisine
        </span>
        <span
          style={{ cursor: "pointer", color: activeCategory === "Nigerian" ? "#DAA520" : "#8B0000" }}
          onClick={() => handleCategoryClick("Nigerian")}
        >
          Nigerian Cuisine
        </span>
        <span
          style={{ cursor: "pointer", color: activeCategory === "Fusion" ? "#DAA520" : "#8B0000" }}
          onClick={() => handleCategoryClick("Fusion")}
        >
          Fusion
        </span>
      </div>

      {/* Display the menu items conditionally based on activeCategory */}
      {activeCategory === "Nepalese" && (
        <ul>
          {nepaleseMenu.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {activeCategory === "Nigerian" && (
        <ul>
          {nigerianMenu.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {activeCategory === "Fusion" && (
        <ul>
          {fusionMenu.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuPage;