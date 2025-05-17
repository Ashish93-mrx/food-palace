import { useState } from "react";
import ItemList from "./ItemList";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
// import { CIcon } from "@coreui/icons-react";
// import { cilChevronCircleDownAlt, cilChevronCircleUpAlt } from "@coreui/icons";

const RestaurantCategory = ({data,showItems,setShowIndex}) => {

    const [tmp, setTmp] = useState(false);
    const handleClick = () => {
        setShowIndex();
        setTmp(!tmp);
    };
    return (
        <div>
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
                <div className="flex justify-between cursor-pointer"
                onClick={handleClick}>
                    <span className="font-serif text-lg">{data.title}({data.itemCards.length})</span>
                        <span className="text-2xl text-gray-600">
                        {tmp && showItems ? (
                            <FaChevronUp/>
                        ) : (
                            <FaChevronDown/>
                        )}
                        </span>
                </div>
                {tmp && showItems && data.itemCards.map((i)=><ItemList item={i?.card?.info} key={i?.card?.info?.id} deleteToggle={false}/>)}
            </div>
        </div>
    );
};

export default RestaurantCategory;