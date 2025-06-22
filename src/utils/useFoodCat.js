import { useEffect, useState } from "react";

function useFoodCat() {

    const [onYourMindData, setOnYourMindData] = useState([]);
    const [lng, setLon] = useState("74.8559568");
    const [lat, setLat] = useState("12.9141417");

    async function fetchData() {
        const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "x-cors-api-key": "temp_9dfcf6835ec787f9b9945118451b2d29",
        },
      }
    );

    const result = await data.json();
        let data2 = result?.data?.cards.find(
            (data) => data?.card?.card?.id == "whats_on_your_mind"
        ).card?.card?.imageGridCards?.info;

        setOnYourMindData(data2);
    }
    useEffect(() => {
        fetchData();
    }, [lat, lng]);

    return [onYourMindData];
}

export default useFoodCat;