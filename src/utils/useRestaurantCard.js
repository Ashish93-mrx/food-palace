import { useEffect,useState } from "react";
import {RESTAURANT_URL} from "../utils/constants";
import {CORS_API} from "../utils/constants";

const useRestaurantCard = () => {
    const [res, setRes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetch(
                "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
                {
                    headers: {
                        "x-cors-api-key": "temp_9dfcf6835ec787f9b9945118451b2d29",
                    },
                }
            );

            const json = await data.json();
            // console.log("Fetched Data:", json);
            // Ensure valid data structure
            const restaurants = json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            setRes(restaurants);
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
            setRes([]); // Avoid setting null to prevent crashes
        }
    };

    return res;
};

export default useRestaurantCard;

