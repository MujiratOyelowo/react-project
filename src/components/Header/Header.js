import React from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styling/custom.scss";

// Importing images
import DalBhat from "../../assets/images/Nepalese/Dal-Bhat.jpg";
import JollofRice from "../../assets/images/Nigerian/Jollof-Rice.jpg";
import Momos from "../../assets/images/Nepalese/steamed-momos-wontons.jpg";
import Asaro from "../../assets/images/Nigerian/asaro.jpg";

function Header() {
  return (
    <Container fluid className="py-1 header-container">
      <Row className="align-items-center align-items-center">
        {/* Left Column: Tagline and Reserve Button */}
        <Col md={6}>
          <h1 className="header-text">
            Where Himalayan Peaks Meets West African Spice
          </h1>
          <Button as={Link} to="/reservation" className="header-button">
            Reserve Now
          </Button>
        </Col>

        {/* Right Column: Scrollable Carousel */}
        <Col md={6}>
          <Carousel fade indicators controls interval={3000}>
            <Carousel.Item>
              <img
                className="d-block w-100 header-carousel-image"
                src={DalBhat}
                alt="Dal Bhat"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 header-carousel-image"
                src={JollofRice}
                alt="Jollof Rice"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 header-carousel-image"
                src={Momos}
                alt="Momos"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 header-carousel-image"
                src={Asaro}
                alt="Asaro"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;