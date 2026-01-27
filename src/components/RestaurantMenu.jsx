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
  const [showItems, setShowItems] = useState(false);
  const [showIndex, setShowIndex] = useState(null);
  const handleClick = () => {};

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
      <div className="w-6/12 mx-auto my-8 bg-white shadow-md rounded-2xl p-5 flex gap-4">
        <img
          src={CON_URL + "/" + cloudinaryImageId}
          alt="item"
          className="w-[10rem] h-[10rem] object-cover rounded-lg"
        />
        <div className="ml-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {name}
          </h1>

          <span className="font-medium flex items-center">
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              <IoIosStar className="text-green-600" />
              {avgRatingString} · {cuisines.join(", ")}
            </p>
          </span>
          <p className="font-normal mt-4 flex items-center">
            <MdLocationPin />
            {areaName}
          </p>
        </div>
      </div>
      <div className="text-center">
        {categories.map((category, index) => (
          <RestaurantCategory
            data={category?.card?.card}
            key={category.card?.card?.categoryId}
            setShowIndex={() => setShowIndex(index)}
            showItems={index === showIndex ? true : false}
          />
        ))}
      </div>
    </>
  );
};

export default RestaurantMenu;
