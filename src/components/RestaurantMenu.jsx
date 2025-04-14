import { useState, useEffect } from "react";
import {UserClassShimmer} from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from '../utils/useRestaurantMenu';
import { MENU_API } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";
import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
    const { resId } = useParams();
    // const [resInfo, setResInfo] = useState();
    const [showItems, setShowItems] = useState(false);
    const [showIndex, setShowIndex] = useState(null);
    // console.log(data,"from acc");
    const handleClick = () => {
        // setShowItems(!showItems);
    };

    const resInfo = useRestaurantMenu(resId);

    if(resInfo==null) return <MenuShimmer />

    const resCrd = resInfo?.cards.find((card) => card?.card?.card?.info);

    const { name, cloudinaryImageId,costForTwoMessage, cuisines} = resCrd?.card?.card?.info || {};

    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>c.card?.card?.["@type"]=="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")


return (
        <div className="text-center">
            <h1 className="font-bold my-10 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(",")} - {costForTwoMessage}</p>
            {/* <h3>{costForTwoMessage}</h3>
            <h2>Name of the restau</h2> */}


{
    categories.map((category,index) => <RestaurantCategory data={category?.card?.card} key={category.card?.card?.categoryId} setShowIndex={()=>setShowIndex(index)} showItems={index === showIndex ? true : false}/>)
}
            {/* <ul>
            {itemCards.map((i) =><li key={i?.card?.info?.id}>{i?.card?.info?.name}- Rs.{ i?.card?.info?.price/100 || i?.card?.info?.defaultPrice}</li>)}

            </ul> */}
        </div>
    );
};

export default RestaurantMenu;