import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "../components/Map.css"; // Import CSS file for custom styling

interface ClassResult {
  survey_number: string;
  state_or_ut: string;
  class: string;
}

interface CropSuggestionResponse {
  cropSuggestion: string;
}

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [classResult, setClassResult] = useState<ClassResult | null>(null);
  const [cropSuggestion, setCropSuggestion] =
    useState<CropSuggestionResponse | null>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaGFyc2hkZXNobXVraDIxIiwiYSI6ImNsdW1ydmF3MjBiNWMya3BueWxsbHc1OTYifQ.ZQ10ldWOzFyzBb_DMeiDXg"; // Your provided Mapbox access token

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 9,
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude] as LngLatLike);
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

          // Call the first backend API (get_class) with the obtained longitude, latitude, and area name
          fetch("http://localhost:5003/get_class", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude: lat, longitude: lng, areaName }),
          })
            .then((response) => response.json())
            .then((data: ClassResult) => {
              console.log("Class result:", data);
              setClassResult(data); // Store the class result in state
            })
            .catch((error) => {
              console.error("Error fetching class result:", error);
            });

          // Call the second backend API (suggest-crops) with the obtained longitude, latitude, and area name
          fetch("http://localhost:5001/suggest-crops", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude: lat, longitude: lng, areaName }),
          })
            .then((response) => response.json())
            .then((data: CropSuggestionResponse) => {
              console.log("Crop suggestion:", data);
              setCropSuggestion(data); // Store the crop suggestion result in state
            })
            .catch((error) => {
              console.error("Error fetching crop suggestion:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching reverse geocoding data:", error);
        });
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} className="map" />
      {classResult && (
        <div>
          <h3>Class Result:</h3>
          <p>Survey Number: {classResult.survey_number}</p>
          <p>State/UT: {classResult.state_or_ut}</p>
          <p>Class: {classResult.class}</p>
        </div>
      )}
      {cropSuggestion && (
        <div>
          <h3>Crop Suggestion:</h3>
          <p>{cropSuggestion.cropSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default Map;
