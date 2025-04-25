import { CON_URL } from "../utils/constants";
import { useContext } from "react";
import UserContext from "../utils/UserContext";


const RestaurantCard = (props) =>{
    const {resData} = props;
    // console.log(resData);
    const {name,cloudinaryImageId,cuisines,
costForTwo,sla
    } = resData;

    const {loggedInUser} = useContext(UserContext)
    return (
        <div
  data-testid="resCard"
  className="m-2 p-2 w-[260px] rounded-2xl bg-white hover:shadow-xl transition-all duration-300 border border-gray-200"
>
  <img
    className="rounded-xl w-full h-40 object-cover"
    alt="res-logo"
    src={CON_URL + "/" + cloudinaryImageId}
  />

  <div className="mt-4">
    <h3 className="font-semibold text-lg text-gray-800 truncate">{name}</h3>

    <p className="text-sm text-gray-500 mt-1 truncate">
      {cuisines.join(", ")}
    </p>

    <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
        {sla.deliveryTime} mins
      </span>
      <span className="font-semibold">{costForTwo}</span>
    </div>

    {loggedInUser && (
      <div className="mt-3 text-xs text-gray-400 italic">
        {/* Viewed by: {loggedInUser} */}
      </div>
    )}
  </div>
</div>

    )
}

export const withPromotedLabel = (RestaurantCard) =>{
    return (props) => {
        return (
            <div>
                <label>Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}

export default RestaurantCard;