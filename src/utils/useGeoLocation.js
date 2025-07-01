import { useState, useEffect } from "react";
import { GEO_LOC } from "../utils/constants";

const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
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
      } else {
        setError("No data found in response.");
      }
    } catch (err) {
      console.error("Error fetching geolocation data:", err);
      setError("Server error.");
    } finally {
      setLoading(false);
  };

  const getLocation = () => {
    setError(null);
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
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
        let message = "";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = "Permission denied. Please allow location access.";
            break;
          case err.POSITION_UNAVAILABLE:
            message = "Position unavailable.";
            break;
          case err.TIMEOUT:
            message = "Request timed out.";
            break;
          default:
            message = "An unknown error occurred.";
            break;
        }

        console.error("Geolocation error:", message);
        setError(message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return { res, error, getLocation, loading };
};

export default useGeoLocation;
