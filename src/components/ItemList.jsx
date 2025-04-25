import { useDispatch, useSelector } from "react-redux";
import { addItem, decreaseItem } from "../utils/cartSlice";
import { CON_URL } from "../utils/constants";

const ItemList = ({ item, deleteToggle }) => {
  const dispatch = useDispatch();

  const itemInCart = useSelector((store) =>
    store.cart.items.find((i) => i.id === item.id)
  );

  const count = itemInCart?.count || 0;

  const handleAddItem = () => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = () => {
    dispatch(decreaseItem(item.id));
  };

  return (
    <div>
      <div
        data-testid="foodItems"
        key={item.id}
        className="p-4 m-2 border border-gray-200 border-b-2 text-left flex justify-between"
      >
        <div className="w-9/12">
          <div className="py-2 flex justify-between">
            <div><span>{item.name}{" "}</span></div>
            <div><span>
              Rs.{" "}
              {Math.ceil(item.price
                ? item.price / 100
                : item.defaultPrice / 100)}{deleteToggle && (" x "+(count))}
            </span>
            </div>
          </div>
          <p className="text-xs">{item.description}</p>
          <h5>{deleteToggle && Math.ceil((item.price ? item.price / 100 : item.defaultPrice / 100))*count }</h5>
        </div>

        <div className="relative w-32 h-32">
          <div className="absolute -top-4 -left-4 w-20">
            {count > 0 ? (
              <div className="flex items-center justify-between bg-white rounded-lg shadow-md px-2 py-1">
                <button
                  className="text-lg px-2 hover:bg-amber-400 rounded cursor-pointer"
                  onClick={handleRemoveItem}
                >
                  -
                </button>
                <span className="font-semibold">{count}</span>
                <button
                  className="text-lg px-2 hover:bg-amber-400 rounded cursor-pointer"
                  onClick={handleAddItem}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="p-2 w-full bg-white rounded-lg shadow-md hover:bg-sky-700 hover:text-white transition cursor-pointer"
                onClick={handleAddItem}
              >
                ADD
              </button>
            )}
          </div>

          <img
            src={CON_URL + "/" + item.imageId}
            alt="item"
            className="w-full h-full object-cover rounded"
          />
        </div>
        {/* {deleteToggle && <button onClick={deleteCartItem}>DELETE</button>} */}
      </div>
    </div>
  );
};

export default ItemList;
