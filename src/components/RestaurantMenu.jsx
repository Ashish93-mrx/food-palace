import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { CON_URL } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";
import { MenuShimmer } from "./Shimmer";
import { IoIosStar } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
  const { resId } = useParams();
  // const [resInfo, setResInfo] = useState();
  const [showItems, setShowItems] = useState(false);
  const [showIndex, setShowIndex] = useState(null);
  // console.log(data,"from acc");
  const handleClick = () => {
    // setShowItems(!showItems);
  };

  const { lat, lng } = useSelector((state) => state.cart.location);
  const resInfo = useRestaurantMenu(resId, lat, lng);

  if (resInfo == null) return <MenuShimmer />;

  const resCrd = resInfo?.cards.find((card) => card?.card?.card?.info);

  const {
    name,
    cloudinaryImageId,
    costForTwoMessage,
    avgRatingString,
    areaName,
    cuisines,
  } = resCrd?.card?.card?.info || {};

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    );

  return (
    <>
      <div className="w-6/12 mx-auto my-8 bg-gray-50 shadow-lg p-4 flex flex-row">
        <img
          src={CON_URL + "/" + cloudinaryImageId}
          alt="item"
          className="w-[10rem] h-[10rem] object-cover rounded-lg"
        />
        <div className="ml-2">
          <h1 className="font-bold  text-2xl">{name}</h1>

          <span className="font-medium flex items-center">
            <p>{avgRatingString}</p>
            <IoIosStar />
            <p className="pl-4">
              {cuisines.join(",")} - {costForTwoMessage}
            </p>
          </span>
          <p className="font-normal mt-4 flex items-center">
            <MdLocationPin />
            {areaName}
          </p>
        </div>
      </div>
      <div className="text-center">
        {/* <h3>{costForTwoMessage}</h3>
            <h2>Name of the restau</h2> */}

        {categories.map((category, index) => (
          <RestaurantCategory
            data={category?.card?.card}
            key={category.card?.card?.categoryId}
            setShowIndex={() => setShowIndex(index)}
            showItems={index === showIndex ? true : false}
          />
        ))}
        {/* <ul>
            {itemCards.map((i) =><li key={i?.card?.info?.id}>{i?.card?.info?.name}- Rs.{ i?.card?.info?.price/100 || i?.card?.info?.defaultPrice}</li>)}

            </ul> */}
      </div>
    </>
  );
};

export default RestaurantMenu;
