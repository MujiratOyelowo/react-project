import React from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';

function Home() {
  return (
    <Container fluid className="py-4 home-card">
      <Row className="justify-content-center align-items-center">
        <Col md={4}>
          <h2 className="mb-3 home-title" style={{ color: "#951b1c" }}>
            A fusion of Nepalese and Nigerian Cuisine
          </h2>
          <p className="text-muted">
            Experience a culinary journey where the mystique of Nepalese mountain traditions meets the bold, 
            vibrant spirit of Nigerian cuisine. At our fusion restaurant, every dish is a masterful blend of 
            delicate Himalayan spices and robust West African flavors, inviting you to explore a world where 
            ancient culinary legacies and modern innovation come together in perfect harmony. Savor the creative
            interplay of textures and tastes, as each plate tells a story of cultural unity and gastronomic 
            passion, promising a dining experience as adventurous as it is unforgettable.
          </p>
        </Col>
        <Col md={4} className="text-center">
          <Image
            src="your-second-image-url"
            alt="Nepalese and Nigerian fusion"
            fluid
            rounded
            style={{ border: "1px solid #ccc" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
