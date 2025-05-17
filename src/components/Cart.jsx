import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import ItemList from "./ItemList";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((store) => store.cart.items);

//   const handleIncrement = (item) => {
//     dispatch(addItem(item));
//   };

//   const handleDecrement = (itemId) => {
//     dispatch(decreaseItem(itemId));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const totalPrice = cartItems.reduce(
//     (sum, item) =>
//       sum +
//       (item.price ? item.price / 100 : item.defaultPrice / 100) * item.count,
//     0
//   );
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.price ? item.price / 100 : item.defaultPrice / 100) * item.count,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12 text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="Empty Cart"
            className="w-48 h-48 mb-4"
          />
          <p className="text-lg mb-2">Your cart is empty</p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Go back to explore
          </Link>
        </div>
      ) : (
        <>
          <div className="pt-10">
          <div className="overflow-y-auto flex-1 px-4 h-[27rem]">
            {cartItems.map((i) => (
              <ItemList item={i} key={i?.id} deleteToggle={true} />
            ))}
          </div>
          </div>

          <div className="absolute mt-[0rem] rounded-2xl shadow-2xl shadow-black w-full bg-white py-4 px-4 flex justify-between items-center max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold">
              Total: ₹{Math.ceil(totalPrice)}
            </h4>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

{
  /* <div
key={item.id}
className="flex items-center justify-between border p-4 rounded shadow-sm"
>
<div className="flex items-center gap-4">
  <img
    src={CON_URL + "/" + item.imageId}
    alt={item.name}
    className="w-20 h-20 object-cover rounded"
  />
  <div>
    <h3 className="text-lg font-medium">{item.name}</h3>
    <p className="text-sm text-gray-600">
      ₹
      {(item.price
        ? item.price / 100
        : item.defaultPrice / 100
      ).toFixed(2)}
    </p>
  </div>
</div>

<div className="flex items-center gap-2">
  <button
    className="text-lg px-2 py-1 bg-gray-200 rounded hover:bg-red-300"
    onClick={() => handleDecrement(item.id)}
  >
    -
  </button>
  <span className="font-semibold">{item.count}</span>
  <button
    className="text-lg px-2 py-1 bg-gray-200 rounded hover:bg-green-300"
    onClick={() => handleIncrement(item)}
  >
    +
  </button>
</div>
</div> */
}
