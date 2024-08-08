import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "../components/Map.css"; // Import CSS file for custom styling
import Sidebar from "./Sidebar";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import bg from "../assets/bg.jpeg";

interface ClassResult {
  survey_number: string;
  state_or_ut: string;
  class: string;
  Owner: string;
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
    if (!mapContainerRef.current) {
      console.error("Map container not found.");
      return;
    }

    mapboxgl.accessToken =
      "pk.eyJ1IjoiaGFyc2hkZXNobXVraDIxIiwiYSI6ImNsdW1ydmF3MjBiNWMya3BueWxsbHc1OTYifQ.ZQ10ldWOzFyzBb_DMeiDXg"; // Your provided Mapbox access token

    let map;

    try {
      map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 9,
      });
    } catch (error) {
      console.error("Error initializing Mapbox GL:", error);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setCenter([longitude, latitude] as LngLatLike);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          alert("Geolocation access denied. Please enable location services.");
        }
      );
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
            `Latitude: ${lat}, Longitude: ${lng}, Area Name: ${areaName},`
          );

          // Call the first backend API (get_class) with the obtained longitude, latitude, and area name
          fetch("http://localhost:5003/get_class", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: lat,
              longitude: lng,
              areaName,
            }),
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

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for a location",
    });

    map.addControl(geocoder);

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="whole bg-cover bg-center text-sm bg-[#171717] h-[100vh]">
      <div className="flex">
        {" "}
        <Sidebar />
        <Card
          x-chunk="dashboard-06-chunk-0"
          className="bg-[#09090B] border-[#09090B] text-white rounded-md ml-[11vh] w-[92vw] h-[84vh] mt-[-55px]"
        >
          <CardHeader>
            <CardTitle className="text-[30px]">Yield Atlas</CardTitle>
            <CardDescription className="text-[#A1A1AA]">
              <p className="mt-2">Analyze crop yield and get suggestions.</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row">
              <div
                ref={mapContainerRef}
                className="w-full md:w-[650px] h-[500px] bg-[#171717] p-2 rounded-[10px] mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex flex-col">
                {classResult && (
                  <div className="w-full md:w-[300px] font-light p-4 rounded-md mb-4">
                    <h3 className="font-bold text-[25px] mb-[10px]">
                      Class Result
                    </h3>
                    <p className="font-semibold">
                      Survey Number: {classResult.survey_number}
                    </p>
                    <p className="font-semibold text-sm">
                      State/UT: {classResult.state_or_ut}
                    </p>
                    <p className="font-semibold text-sm">
                      Class: {classResult.class}
                    </p>
                    <p className="font-semibold text-sm">
                      Owner: {classResult.Owner}
                    </p>
                  </div>
                )}
                {cropSuggestion && (
                  <div className="w-[600px] rounded-md text-white p-4 overflow-scroll max-h-[350px]">
                    <h3 className="font-bold text-[25px] mb-[10px]">
                      Crop Suggestions
                    </h3>
                    <p className="text-light">
                      {cropSuggestion.cropSuggestion}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Map;
