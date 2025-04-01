import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <Container fluid className="app-container py-5">
      {/* Row 1: Origin & Mission Statement */}
      <Row className="justify-content-center">
        <Col md={5} className="mb-4">
          <Card className="about-card text-center">
            <Card.Body>
              <Card.Title as="h2" className="about-card-title">
                Origin
              </Card.Title>
              <Card.Text className="about-card-text">
                “Peaks &amp; Spice” was born from a chance encounter between two friends—one from the foothills of the Himalayas in Nepal, and the other from the bustling streets of Lagos in Nigeria. United by their love of food, they discovered surprising similarities in their traditions and vibrant flavors.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5} className="mb-4">
          <Card className="about-card text-center">
            <Card.Body>
              <Card.Title as="h2" className="about-card-title">
                Mission Statement
              </Card.Title>
              <Card.Text className="about-card-text">
                We aim to bring people together through a shared passion for bold, authentic cuisine. By blending Nepalese hospitality and Nigerian soul, we aim to create an unforgettable dining experience that celebrates diversity, fosters community, and inspires curiosity about the world’s many culinary traditions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Row 2: Cultural Fusion & Philosophy */}
      <Row className="justify-content-center">
        <Col md={5} className="mb-4">
          <Card className="about-card text-center">
            <Card.Body>
              <Card.Title as="h2" className="about-card-title">
                Cultural Fusion
              </Card.Title>
              <Card.Text className="about-card-text">
                Nepalese cuisine is known for its aromatic spices, hearty comfort foods, and rich cultural heritage. Nigerian cuisine shines with intense flavors, lively ingredients, and a communal spirit. At “Peaks &amp; Spice,” we fuse these two traditions, creating a tapestry of tastes that highlight the best of both worlds. From our momo dumplings to our jollof-inspired rice, every dish is a reflection of two cultures united by flavor.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5} className="mb-4">
          <Card className="about-card text-center">
            <Card.Body>
              <Card.Title as="h2" className="about-card-title">
                Philosophy
              </Card.Title>
              <Card.Text className="about-card-text">
                At “Peaks &amp; Spice,” we believe that food is a universal language that transcends borders and at the core of every great dish is the shared human experience. Our menu is a reflection of the culinary traditions of both Nepal and Nigeria, interwoven in ways that highlight the harmony between these distinct flavors. We’re more than a restaurant; we’re a testament to the transformative power of cultural exchange, and we invite you to join us on this gastronomic journey.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chef & Team Bios Title */}
      <Row className="justify-content-center">
        <Col md={12} className="mb-3">
          <h2 className="about-card-title text-center">Chef &amp; Team Bios</h2>
        </Col>
      </Row>

      {/* Row 3: Chef Binita & Chef Mujirat */}
      <Row className="justify-content-center">
        <Col md={5} className="mb-4">
          <Card className="about-card text-center">
            <Card.Body>
              <Card.Title as="h4" className="about-card-title">
                Chef Binita
              </Card.Title>
              <Card.Text className="about-card-text">
                Chef Binita brings a refined blend of culinary artistry and authentic tradition to Peaks &amp; Spice. Her expertise in fusing Nepalese spices with innovative techniques creates memorable dishes that captivate taste buds. With years of experience and a passion for excellence, she leads the kitchen with warmth and creative vision.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5} className="mb-4">
          <Card className="about-card text-center">
            <Card.Body>
              <Card.Title as="h4" className="about-card-title">
                Chef Mujirat
              </Card.Title>
              <Card.Text className="about-card-text">
                Chef Mujirat exemplifies dynamic culinary leadership and unwavering dedication to vibrant flavors at Peaks &amp; Spice. His innovative approach to blending Nigerian spices with modern techniques creates bold dishes that delight every palate. With a strong foundation in traditional cooking and creative flair, he continually inspires the team with vision.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Horizontal line separator that spans the full width */}
      <div className="heading-line"></div>
    </Container>
  );
}

export default About;
