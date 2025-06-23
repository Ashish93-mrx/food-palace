import { useState, useEffect } from "react";
import { GEO_LOC } from "../utils/constants";

const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [res, setRes] = useState(null);

  useEffect(() => {
    if (location) {
      fetchExactLoc(location);
    }
  }, [location]);

  const fetchExactLoc = async (location) => {
    try {
      const response = await fetch(`${GEO_LOC}${location.lat},${location.lng}`);
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const { formatted_address, geometry } = result.data[0];
        const { lat, lng } = geometry.location;

        const finalResult = {
          lat,
          lng,
          address: formatted_address,
        };

        setRes(finalResult); 
        console.log("Address:", formatted_address);
        console.log("Geometry:", geometry);
        console.log("Coordinates:", lat, lng);
      } else {
        console.warn("No data found in response.");
      }
    } catch (err) {
      console.error("Error fetching geolocation data:", err);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return { res, error, getLocation };
};

export default useGeoLocation;
