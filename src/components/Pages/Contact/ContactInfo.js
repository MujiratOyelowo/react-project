import React, { useState, useEffect } from "react";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../../../firebase";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import "../../styling/custom.scss";

function ContactInfo() {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const projectId = firebaseConfig.projectId;
        const apiKey = firebaseConfig.apiKey;
        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/config/contactInfo?key=${apiKey}`;
        
        const response = await axios.get(url);
        const fields = response.data.fields;
        const contact = {
          phone: fields.phone.stringValue,
          email: fields.email.stringValue,
          address: fields.address.stringValue,
          social: {
            facebook: fields.social.mapValue.fields.facebook.stringValue,
            instagram: fields.social.mapValue.fields.instagram.stringValue,
            youtube: fields.social.mapValue.fields.youtube.stringValue,
            twitter: fields.social.mapValue.fields.twitter.stringValue,
          },
        };
        setContactData(contact);
      } catch (error) {
        console.error("Error fetching contact info via Axios:", error);
      }
    };

    fetchContactData();
  }, []);

  if (!contactData) return <div>Loading contact info...</div>;

  return (
    <div className="contact-info">
      <div className="heading-line">
        <h2 className="contact-info-title">Contact Info</h2>
      </div>
      <p className="contact-info-text" style={{ margin: 0 }}>
        <FaPhone style={{ marginRight: "8px", color: "#000" }} />
        {contactData.phone}
      </p>
      <p className="contact-info-text" style={{ margin: 0 }}>
        <FaEnvelope style={{ marginRight: "8px", color: "#000" }} />
        {contactData.email}
      </p>
      <p className="contact-info-text" style={{ margin: 0 }}>
        <FaMapMarkerAlt style={{ marginRight: "8px", color: "#000" }} />
        {contactData.address}
      </p>
      <div className="contact-social-icons" style={{ marginTop: "1rem" }}>
        <a href={contactData.social.facebook} target="_blank" rel="noopener noreferrer">
          <FaFacebook style={{ marginRight: "12px", color: "#000" }} />
        </a>
        <a href={contactData.social.instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram style={{ marginRight: "12px", color: "#000" }} />
        </a>
        <a href={contactData.social.youtube} target="_blank" rel="noopener noreferrer">
          <FaYoutube style={{ marginRight: "12px", color: "#000" }} />
        </a>
        <a href={contactData.social.twitter} target="_blank" rel="noopener noreferrer">
          <FaTwitter style={{ color: "#000" }} />
        </a>
      </div>
    </div>
  );
}

export default ContactInfo;