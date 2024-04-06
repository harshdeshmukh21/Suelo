import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./Map.css"; // Import CSS file for custom styling

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFyc2hkZXNobXVraDIxIiwiYSI6ImNsdW1ydmF3MjBiNWMya3BueWxsbHc1OTYifQ.ZQ10ldWOzFyzBb_DMeiDXg";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const geocoderRef = useRef<any>(null); // Change the type to `any` for now, as there is no official TypeScript definition for MapboxGeocoder
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 9,
    });

    // Add search functionality using Mapbox Geocoding API
    geocoderRef.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places...",
      countries: "in", // Limit search results to India
    });

    // Add the geocoder control above the map
    map.addControl(geocoderRef.current, "top-left");

    // Get current location and center the map around it
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    // Add event listener for map click
    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      // Remove existing marker (if any)
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Create a new marker at the clicked location
      const marker = new mapboxgl.Marker({
        color: "#FF0000", // Marker color
        draggable: true, // Make the marker draggable
      })
        .setLngLat([lng, lat]) // Set the marker position based on the clicked coordinates
        .addTo(map);

      // Set the markerRef to the newly created marker
      markerRef.current = marker;

      // Get place name using reverse geocoding
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const placeName = data.features[0].place_name;

      // Log longitude, latitude, and place name
      console.log(
        `Longitude: ${lng}, Latitude: ${lat}, Place Name: ${placeName}`
      );
    });

    return () => map.remove();
  }, []);

  return (
    <div className="map-container">
      <div className="search-box"></div>
      <div ref={mapContainerRef} className="map" />
    </div>
  );
};

export default Map;
