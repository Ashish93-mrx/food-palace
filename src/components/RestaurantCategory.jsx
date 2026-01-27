import { useState } from "react";
import ItemList from "./ItemList";
import { FaChevronDown } from "react-icons/fa";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const [tmp, setTmp] = useState(false);

  const handleClick = () => {
    setShowIndex();
    setTmp((prev) => !prev);
  };

  const isOpen = tmp && showItems;

  return (
    <div>
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={handleClick}
        >
          <span className="text-lg">
            {data.title} ({data.itemCards.length})
          </span>

          <FaChevronDown
            className={`text-xl text-gray-600 transform transition-transform duration-300
              ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>

        {isOpen &&
          data.itemCards.map((i) => (
            <ItemList
              key={i?.card?.info?.id}
              item={i?.card?.info}
              deleteToggle={false}
            />
          ))}
      </div>
    </div>
  );
};

export default RestaurantCategory;