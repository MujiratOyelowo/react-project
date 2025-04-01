import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 42.9741,
  lng: -81.2429,
};

function MapComponent() {
  const [infoOpen, setInfoOpen] = useState(true); 

  const handleMarkerClick = () => {
    // Toggle the InfoWindow
    setInfoOpen(!infoOpen);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAU1NKECca7yEwHJCL9JwjkTDWxItuacs0">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} onClick={handleMarkerClick} />

        {infoOpen && (
          <InfoWindow
          position={center}
          onCloseClick={() => setInfoOpen(false)}
          options={{
            pixelOffset: { width: -10, height: -50 },
          }}
        >
          <div style={{ maxWidth: "200px" }}>
            <h5>Peaks & Spices</h5>
            <p>1001 Fanshawe College Blvd<br />London, ON N5Y 5R6</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1001+Fanshawe+College+Blvd+London+ON"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </div>
        </InfoWindow>
        
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;