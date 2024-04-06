import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css"; // Import CSS file for custom styling

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyc2hkZXNobXVraDIxIiwiYSI6ImNsdW1ydmF3MjBiNWMya3BueWxsbHc1OTYifQ.ZQ10ldWOzFyzBb_DMeiDXg";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      // Check if Mapbox GL is supported
      if (!mapboxgl.supported()) {
        alert('Your browser does not support Mapbox GL');
        return;
      }

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 9,
      });

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          map.setCenter([longitude, latitude]);
        });
      } else {
        alert("Geolocation is not supported by your browser.");
      }

      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        // Use Mapbox Geocoding API to reverse geocode the coordinates
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
        )
          .then((response) => response.json())
          .then((data) => {
            const areaName = data.features[0].place_name;
            console.log(
              `Latitude: ${lat}, Longitude: ${lng}, Area Name: ${areaName}`
            );

            // Call your backend API with the obtained longitude, latitude, and area name
            fetch("http://localhost:5001/suggest-crops", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ latitude: lat, longitude: lng, areaName }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Crop suggestions:", data);
                // Display crop suggestions in the frontend (e.g., using alerts)
                alert(`Crop suggestions: ${JSON.stringify(data)}`);
              })
              .catch((error) => {
                console.error("Error fetching crop suggestions:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching reverse geocoding data:", error);
          });
      });

      return () => map.remove();
    }
  }, []);

  return <div ref={mapContainerRef} className="map" />;
};

export default Map;