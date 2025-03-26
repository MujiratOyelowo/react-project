// MenuPage.js
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styling/custom.scss";

// Example data for each category
const menuData = {
  nepalese: {
    title: "Nepalese Cuisine",
    items: ["Dal Bhat", "Momo", "Chicken Sekuwa"],
  },
  nigerian: {
    title: "Nigerian Cuisine",
    items: ["Jollof Rice", "Egusi Soup", "Suya"],
  },
  fusion: {
    title: "Fusion",
    items: ["Plantain Momo", "Spiced Potato Cutlet", "Tandoori Pepper Chicken"],
  },
  beverages: {
    title: "Beverages",
    items: ["Masala Tea", "Mango Lassi", "Hibiscus Drink"],
  },
  desserts: {
    title: "Desserts",
    items: ["Gulab Jamun", "Puff Puff", "Coconut Barfi"],
  },
};

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("fusion");

  // Toggle category
  const handleCategoryClick = (categoryKey) => {
    setActiveCategory((prev) => (prev === categoryKey ? "" : categoryKey));
  };

  return (
    <Container className="my-5">
      {/* Row for ALL 5 categories on one line */}
      <div className="menu-box">
      <Row className="justify-content-center">
        {/* We’ll map over the keys in menuData to generate each category */}
        {Object.keys(menuData).map((key) => {
          const category = menuData[key];
          return (
            <Col
              key={key}
              md={2}
              className=" text-center"
              style={{ cursor: "pointer", margin: "0.5rem" }}
              onClick={() => handleCategoryClick(key)}
            >
              <h3 style={{ marginBottom: 0 }}>{category.title}</h3>
            </Col>
          );
        })}
      </Row>

      {/* Row for selected items, if any */}
      {activeCategory && (
        <Row className="justify-content-center mt-4">
          <Col md={6} className="text-center">
            {menuData[activeCategory].items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </Col>
        </Row>
      )}
      </div>
    </Container>
  );
}

export default MenuPage;
