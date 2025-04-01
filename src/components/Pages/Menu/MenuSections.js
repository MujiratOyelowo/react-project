import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../../styling/custom.scss";

function MenuSections() {
  const [menuData, setMenuData] = useState(null);
  const [activeCategory, setActiveCategory] = useState("fusion");

  useEffect(() => {
    // Fetching the JSON file from the public folder
    axios.get("/MenuData.json")
      .then((response) => {
        setMenuData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  if (!menuData) return <div>Loading menu data...</div>;

  // Toggle category: clicking the same category will collapse it.
  const handleCategoryClick = (categoryKey) => {
    setActiveCategory((prev) => (prev === categoryKey ? "" : categoryKey));
  };

  return (
    <Container className="my-5">
      <div className="menu-box">
        {/* Horizontal scrollable container for category headings */}
        <Row className="flex-nowrap overflow-auto">
          {Object.keys(menuData).map((key) => {
            const category = menuData[key];
            return (
              <Col
                key={key}
                className="text-center"
                style={{
                  cursor: "pointer",
                  margin: "0.5rem",
                  minWidth: "150px",
                }}
                onClick={() => handleCategoryClick(key)}
              >
                <h3 className="menu-category-heading" style={{ marginBottom: 0 }}>
                  {category.title}
                </h3>
              </Col>
            );
          })}
        </Row>

        {/* Display selected category items in a table */}
        {activeCategory && (
          <Row className="justify-content-center mt-4">
            <Col md={10}>
              <div className="table-responsive">
                <table className="table table-hover text-center">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="menu-size">Small</th>
                      <th className="menu-size">Medium</th>
                      <th className="menu-size">Large</th>
                      <th className="menu-extras">Extras</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuData[activeCategory].items.map((item) => (
                      <tr key={item.name}>
                        <td className="menu-item">{item.name}</td>
                        <td className="menu-price">{item.small}</td>
                        <td className="menu-price">{item.medium}</td>
                        <td className="menu-price">{item.large}</td>
                        <td className="menu-extras">{item.extras}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
}

export default MenuSections;