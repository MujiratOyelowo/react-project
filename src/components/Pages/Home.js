import React from "react";
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';

// Correct relative paths to images from /src/components/Pages/
import yomariImg from '../../assets/images/Nepalese/Yomari.jpg';
import moimoiImg from '../../assets/images/Nigerian/moimoi.jpg';
import thukpaImg from '../../assets/images/Nepalese/Thupka.jpg';
import ofadaImg from '../../assets/images/Nigerian/ofada.jpeg';
import fusionImg from '../../assets/images/fusion/fusion.jpg';

function Home() {
  const specials = [
    {
      name: "Thukpa",
      img: thukpaImg,
      desc: "Thukpa is a warming Himalayan bowl of tender noodles immersed in a spice-kissed broth, where every sip and bite beautifully unfolds ancient mountain tales and comforting flavors with artful simplicity."
    },
    {
      name: "Fusion",
      img: fusionImg,
      desc: "This culinary showcase dazzles with a vibrant West African spread of jollof rice, crispy plantains, tender fufu and a richly spiced stew, embodying deep-rooted tradition and soulful comfort, alongside an enchanting Himalayan platter featuring artfully pinched momos cradling golden lentil soup with a spicy, tangy dipping sauce, reflecting exquisite craftsmanship and a delicate balance of heritage and innovation, undeniably captivating."
    },
    {
      name: "Ofada",
      img: ofadaImg,
      desc: "Ofada rice, a cherished Nigerian delicacy, boasts a nutty aroma and deep flavor, perfectly paired with a spicy, richly textured sauce; its unique, artisanal preparation embodies tradition and culinary passion."
    }
  ];

  return (
    <Container fluid className="py-4 home-card">
      {/* Intro Section */}
      <Row className="justify-content-center align-items-center mb-5">
        {/* Carousel Column (Left) */}
        <Col md={4} className="text-center mb-4">
          <Carousel indicators={false} interval={3000} touch={true}>
            <Carousel.Item>
              <img
                src={yomariImg}
                alt="Yomari"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  height: "300px",
                  width: "300px",
                  objectFit: "cover",
                  margin: "0 auto"
                }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={moimoiImg}
                alt="Moimoi"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  height: "300px",
                  width: "300px",
                  objectFit: "cover",
                  margin: "0 auto"
                }}
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        {/* Text Column (Right) */}
        <Col md={6}>
          <h2 className="mb-3 home-title" style={{ color: "#951b1c", fontWeight: "bold" }}>
            A fusion of Nepalese and Nigerian Cuisine
          </h2>
          {/* Removed "text-muted" class and added inline style */}
          <p style={{ color: "#8B0000" }}>
            Experience a culinary journey where the mystique of Nepalese mountain traditions meets the bold, 
            vibrant spirit of Nigerian cuisine. At our fusion restaurant, every dish is a masterful blend of 
            delicate Himalayan spices and robust West African flavors, inviting you to explore a world where 
            ancient culinary legacies and modern innovation come together in perfect harmony. Savor the creative
            interplay of textures and tastes, as each plate tells a story of cultural unity and gastronomic 
            passion, promising a dining experience as adventurous as it is unforgettable.
          </p>
        </Col>
      </Row>
      
      {/* Horizontal line below the Intro Section */}
      <div className="line-separator"></div>

      {/* Today's Specials Section */}
      <h2 className="text-center mb-4 today-special">
        Today's Specials
      </h2>
      <Row className="justify-content-center">
        {specials.map((dish, idx) => (
          <Col key={idx} md={3} className="mx-3 mb-4">
            <Card className="text-center shadow-sm home-card">
              <Card.Header
                className="special-title"
                style={{ backgroundColor: "#f7e6b5", fontWeight: "bold", color: "#8B0000" }}
              >
                {dish.name}
              </Card.Header>
              <Card.Img
                variant="top"
                src={dish.img}
                alt={dish.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body style={{ backgroundColor: "#fefae0" }}>
                <Card.Text style={{ color: "#8B0000" }}>{dish.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
