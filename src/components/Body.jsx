import { useState, useEffect } from "react";
import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import {Shimmer} from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../utils/UserContext";
import TopRestaurant from "./TopRestaurant";

const Body = () => { 

    const [resObj, setListResObj] = useState([]);
    const [temp, setTemp] = useState([]);
    const [searchText, setSearchText] = useState("");
    const {loggedInUser,setUserName} = useContext(UserContext);
    const [imageGrids, setImageGrids] = useState([]);
    

// "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard); //higher order component
    useEffect(()=>{
        fetchData();
    }, []);
    const fetchData = async () => {
        const data = await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=12.9141417&lng=74.8559568&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
                headers: {
                'x-cors-api-key': 'temp_9dfcf6835ec787f9b9945118451b2d29'
                }
            }
        );
        
        const json = await data.json();

        // setListResObj(json.data.cards);
        setListResObj(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setTemp(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants,"okokoko1")
        setImageGrids(json?.data?.cards[1]?.card?.card);
        console.log(json?.data?.cards[1]?.card?.card,"okokoko2");
        // console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants,"first");
        // console.log(resObj,"sec");
    }

    const onlineStatus = useOnlineStatus();

    if(onlineStatus ===false) return <h1>LOOKS LIKE YOU ARE OFFLINE</h1>
//conditional rendering
    if(resObj.length === 0 && imageGrids.length === 0){
        return (    <div className="pt-5 w-full">
     <div className="w-[85%] mx-auto ">
        <div className="flex flex-wrap justify-center">
            {Array(10).fill(null).map((_, index) => (
              <Shimmer key={index} />
            ))}
          </div>
          </div>
          </div>
          )
    }


    return (
        <div className="body">
        
        <div className="filter flex flex-wrap gap-4 p-4 items-center bg-gray-50 rounded-lg shadow-sm sticky top-27 z-50">


  {/* Username Input */}
  <div className="search">
    <input
      type="text"
      className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
      value={loggedInUser}
      disabled
      onChange={(e) => setUserName(e.target.value)}
    />
  </div>

  <div className="search">
  <div className="relative w-full max-w-md">
  <input
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
  />

  {/* X Button */}
  {searchText && (
    <button
      onClick={() => {
        setSearchText('');
        setListResObj(temp); // Reset to full list or do any custom logic
      }}
      className="absolute right-3 top-2 text-gray-500 hover:text-gray-800 text-lg font-bold focus:outline-none"
    >
      ✕
    </button>
  )}
</div>

  </div>

  {/* Search Button */}
  <div className="search">
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
  </div>

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
<div className="w-[75%] mx-auto overflow-hidden">
<TopRestaurant trg={imageGrids}/>
                <div className="font-bold text-2xl px-4 py-2">Restaurants</div>
                <div className="flex flex-wrap">
                {
                    resObj.map((i)=>( <Link to={'/restaurants/'+i?.info?.id} key={i?.info?.id} >

                        <RestaurantCard resData = {i.info} />
                    </Link>
                    ))
                }
                </div>
        </div>
        </div>
        </div>
    )
}

export default Body;