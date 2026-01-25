import { useEffect, useState } from "react";
import { API_BASE } from "./constants";

const useRestaurantMenu = (resId, lat, lng) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId || !lat || !lng) return;
    fetchData();
  }, [resId, lat, lng]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/menu?restaurantId=1073138&lat=12.9966135&lng=77.5920581`,
      );

      if (!res.ok) throw new Error("Menu API failed");

      const json = await res.json();
      setResInfo(json.data);
    } catch (err) {
      console.warn("Using mock menu");

      const mockRes = await fetch(
        `${API_BASE}/api/mock-menu?restaurantId=${resId}`,
      );

      const mockJson = await mockRes.json();
      setResInfo(mockJson.data);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
