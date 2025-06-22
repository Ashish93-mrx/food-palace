import { useState, useEffect, useMemo } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../utils/UserContext";
import TopRestaurant from "./TopRestaurant";
import debounce from "../utils/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { addLocationInput } from "../utils/cartSlice";
import FoodCat from "./FoodCat";
import useFoodCat from "../utils/useFoodCat";

const Body = () => {
  const [resObj, setListResObj] = useState([]);
  const [temp, setTemp] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [locSearchText, setLocSearchText] = useState("");
  const { loggedInUser, setUserName } = useContext(UserContext);
  const [imageGrids, setImageGrids] = useState([]);
  const [locList, setLocList] = useState([]);
  const [lon, setLon] = useState("74.8559568");
  const [lat, setLat] = useState("12.9141417");
  const [onYourMindData] = useFoodCat();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.cart.locationInput);

  const fetchAllLocations = async (val) => {
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${val}`
    );

    const res = await data.json();
    setLocList(res?.data);
  };
  let LocDebounce = useMemo(() => debounce(fetchAllLocations), []);

  // "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard); //higher order component
  useEffect(() => {
    !selector ? fetchData(lon, lat) : fetchLocData(selector);
  }, []);
  const fetchData = async (lon, lat) => {
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "x-cors-api-key": "temp_9dfcf6835ec787f9b9945118451b2d29",
        },
      }
    );

    const json = await data.json();

    // setListResObj(json.data.cards);
    setListResObj(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setTemp(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setImageGrids(json?.data?.cards[1]?.card?.card);
    // console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants,"first");
    // console.log(resObj,"sec");
  };

  const fetchLocData = async (val) => {
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${val}`
    );

    const res = await data.json();
    const lat = await res?.data[0]?.geometry?.location?.lat;
    const lon = await res?.data[0]?.geometry?.location?.lng;
    setLat(lat);
    setLon(lon);
    fetchData(lon, lat);
    setLocList([]);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) return <h1>LOOKS LIKE YOU ARE OFFLINE</h1>;
  //conditional rendering
  if (resObj?.length === 0 && imageGrids.length === 0) {
    return (
      <div className="pt-5 w-full">
        <div className="w-[85%] mx-auto">
          <div className="flex flex-wrap justify-center">
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <Shimmer key={index} />
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="filter flex flex-wrap gap-4 p-4 items-center bg-gray-50 rounded-lg shadow-sm sticky top-27 z-50">
        {/* Username Input */}
        {/* <div className="search">
    <input
      type="text"
      className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
      value={loggedInUser}
      disabled
      onChange={(e) => setUserName(e.target.value)}
    />
  </div> */}
        <div className="search">
          <div className="relative w-96">
            <input
              type="text"
              data-testid="searchInput"
              className="border border-black px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-400 w-full"
              value={locSearchText}
              onChange={(e) => {
                setLocSearchText(e.target.value);
                LocDebounce(e.target.value);
              }}
              placeholder="Enter the Location"
            />

            {locSearchText && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
                onClick={() => {
                  setLocSearchText("");
                  setLocList([]);
                  // setListResObj([]);
                }}
              >
                ✕
              </button>
            )}

            <div className="absolute top-full z-10 w-full">
              {locList &&
                locList.map((i, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-300 text-gray-900 text-sm w-full shadow-lg overflow-hidden dark:bg-gray-700 dark:border-gray-600 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => {
                      fetchLocData(i.place_id);
                      setLocSearchText(i.description);
                      dispatch(addLocationInput(i.place_id));
                    }}
                  >
                    <div className="text-black dark:text-amber-50 font-medium">
                      {i.structured_formatting?.main_text}
                    </div>
                    <div className="text-gray-300 text-xs">
                      {i.structured_formatting?.secondary_text}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="search">
          <div className="relative w-full max-w-md">
            {/* <input
    type="text"
    data-testid="searchInput"
    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-400"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        const filteredRes = resObj.filter((i) =>
          i.info.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setListResObj(filteredRes);
      }
    }}
  /> */}

            {/* X Button */}
            {/* {searchText && (
    <button
      onClick={() => {
        setSearchText('');
        setListResObj(temp); // Reset to full list or do any custom logic
      }}
      className="absolute right-3 top-2 text-gray-500 hover:text-gray-800 text-lg font-bold focus:outline-none"
    >
      ✕
    </button>
  )} */}
          </div>
        </div>

        {/* Search Button */}
        {/* <div className="search">
    <button
      className="bg-orange-400 hover:bg-orange-500 text-white px-5 py-2 rounded-md transition"
      onClick={() => {
        const filteredRes = resObj.filter((i) =>
          i.info.name.toLowerCase().includes(searchText)
        );
        setListResObj(filteredRes);
      }}
    >
      Search
    </button>
  </div> */}

        {/* Filter Button */}
        <div className="search">
          {/* <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition"
      
    >
      Filter res
    </button> */}
        </div>
      </div>
      <div className="w-full">
        <div className="w-[75%] mx-auto overflow-x-visible">
        <div className="w-full overflow-hidden">

          {onYourMindData?.length ? 
                            (<FoodCat data={onYourMindData} />)
          : 
            ""
          }
        </div>
          <TopRestaurant trg={imageGrids} />
          <div className="font-bold text-2xl px-4 py-2">Restaurants</div>
          <div className="flex flex-wrap">
            {resObj ? (
              resObj?.map((i) => (
                <Link to={"/restaurants/" + i?.info?.id} key={i?.info?.id}>
                  <RestaurantCard resData={i.info} />
                </Link>
              ))
            ) : (
              <h1 className="py-28 flex justify-center">
                Couldn't find data for your searched place, please refresh
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
