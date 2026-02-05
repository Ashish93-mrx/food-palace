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
import useGeoLocation from "../utils/useGeoLocation";
import { MdOutlineMyLocation } from "react-icons/md";
import { API_BASE } from "../utils/constants";
import { addLocation } from "../utils/cartSlice";
import { FaChevronDown } from "react-icons/fa";

const Body = () => {
  const [resObj, setListResObj] = useState([]);
  const [isAutoFill, setIsAutoFill] = useState(false);
  const [temp, setTemp] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [locSearchText, setLocSearchText] = useState("");
  const { loggedInUser, setUserName } = useContext(UserContext);
  const [imageGrids, setImageGrids] = useState([]);
  const [locList, setLocList] = useState([]);
  const [locLoad, setLocLoad] = useState(false);
  const [lon, setLon] = useState("77.5920581");
  const [lat, setLat] = useState("12.9966135");
  const [expanded, setExpanded] = useState(false);
  const [onYourMindData, setOnYourMindData] = useState([]);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.cart.locationInput);
  const { res, error, getLocation, loading } = useGeoLocation();

  const handleClick = () => {
    getLocation();
  };

  useEffect(() => {
    if (res) {
      dispatch(
        addLocation({
          lat: res.lat,
          lng: res.lng,
          address: res.address,
        }),
      );
      setLocLoad(true);
      setIsAutoFill(true);
      fetchData(res.lng, res.lat);
      setLocSearchText(res.address);
    }
  }, [res]);

  const fetchAllLocations = async (val) => {
    if (!val) return;

    const res = await fetch(
      `${API_BASE}/api/location-autocomplete?input=${encodeURIComponent(val)}`,
    );

    if (!res.ok) return;

    const json = await res.json();
    setLocList(json.data || []);
  };

  let LocDebounce = useMemo(() => debounce(fetchAllLocations), []);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

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
      },
    );

    const json = await data.json();

    setListResObj(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setTemp(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setImageGrids(json?.data?.cards[1]?.card?.card);

    let data2 = json?.data?.cards.find(
      (data) => data?.card?.card?.id == "whats_on_your_mind",
    ).card?.card?.imageGridCards?.info;

    setOnYourMindData(data2);
    setLocLoad(false);
  };

  const fetchLocData = async (val) => {
    setLocLoad(true);
    const data = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${val}`,
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

  if ((resObj?.length === 0 && imageGrids.length === 0) || locLoad) {
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
      <div className="filter flex flex-wrap gap-4 p-4 items-start bg-gray-50 rounded-lg shadow-sm sticky top-2 sm:top-18 z-40">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full max-w-3xl">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              data-testid="searchInput"
              value={locSearchText}
              onChange={(e) => {
                const value = e.target.value;
                setLocSearchText(value);

                if (!isAutoFill) {
                  LocDebounce(value);
                }
                setIsAutoFill(false);
              }}
              placeholder="Enter the Location"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pr-10 text-gray-800  bg-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition"
            />

            {/* Clear Button */}
            {locSearchText && (
              <button
                type="button"
                onClick={() => {
                  setLocSearchText("");
                  setLocList([]);
                }}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:text-gray-400 "
              >
                ✕
              </button>
            )}

            {/* Autocomplete Dropdown */}
            {locList?.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto premium-scrollbar">
                {locList.map((i, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      const { lat, lng } = i.geometry.location;

                      dispatch(
                        addLocation({
                          lat,
                          lng,
                          address: i.description,
                        }),
                      );

                      setLat(lat);
                      setLon(lng);
                      fetchData(lng, lat);

                      setLocSearchText(i.description);
                      setLocList([]);
                    }}
                    className="px-4 py-3 text-sm text-gray-900 dark:text-white border-b last:border-b-0 border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <div className="font-medium">
                      {i.structured_formatting?.main_text}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {i.structured_formatting?.secondary_text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Get Current Location Button */}
          <div className="w-full md:max-w-72">
            <button
              onClick={handleClick}
              className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Fetching your Location...</span>
                </>
              ) : (
                <>
                  <MdOutlineMyLocation className="text-lg" />
                  <span>Get Current Location</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="search">
          <div className="relative w-full max-w-md"></div>
        </div>
        <div className="search"></div>
      </div>
      <div className="w-full">
        <div className="w-[75%] mx-auto overflow-x-visible">
          <div className="w-full overflow-hidden">
            {onYourMindData?.length ? <FoodCat data={onYourMindData} /> : ""}
          </div>
          <TopRestaurant trg={imageGrids} />
          <div className="font-bold text-2xl px-4 py-2">Restaurants</div>
          <div className="flex items-center justify-center pt-2 pb-8">
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

          <div className="mx-auto py-8">
            <div className="relative bg-white border-1.5 rounded-2xl p-6 shadow-sm">
              <div
                className={`text-gray-700 leading-relaxed transition-all font-roboto duration-500 ease-in-out
          ${expanded ? "max-h-[2000px]" : "max-h-[185px] overflow-hidden"}`}
              >
                <h2 className="text-2xl  font-semibold text-[#676a6d] mb-4">
                  Discover Delicious Food Delights Online Near You
                </h2>

                <p className="mb-4 font-normal leading-5">
                  Craving something delicious? Discover a world of culinary
                  delights right at your fingertips with food delivery near me!
                  Whether you're in the mood for a hearty burger, fresh sushi,
                  or a comforting bowl of pasta, there's no shortage of options
                  to satisfy your cravings. The convenience of online food
                  delivery near me allows you to explore various restaurants and
                  cuisines without leaving the comfort of your home.
                </p>

                <p className="mb-4 font-normal leading-5">
                  Simply browse through local eateries, check out their menus,
                  and find the perfect meal for any occasion. Whether you're
                  planning a casual dinner with friends, a family feast, or a
                  cozy night in, the choices are endless.
                </p>

                <h3 className="text-2xl font-semibold text-[#676a6d] mb-4">
                  Convenience at Your Fingertips: Order Food Online Near You Now
                </h3>

                <p className="mb-4 font-normal leading-5">
                  Experience the ultimate convenience with food ordering near me
                  and indulge in your favourite meals without the hassle! With
                  just a few clicks, you can order food online near me from a
                  variety of restaurants, all offering speedy delivery right to
                  your doorstep.
                </p>

                <p>
                  Why wait in long lines or spend time cooking when you can have
                  delicious meals delivered right to you? Order now and make
                  mealtime special!
                </p>
              </div>

              {!expanded && (
                <div className="absolute bottom-20 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-orange-600 cursor-pointer font-medium hover:underline"
                >
                  <span className="flex items-center gap-1">
                    {expanded ? "See less" : "See more"}
                    <FaChevronDown
                      className={`text-orange-600 text-xl w-4 text-gray-600 transform transition-transform duration-300
                                ${expanded ? "rotate-180" : "rotate-0"}`}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
