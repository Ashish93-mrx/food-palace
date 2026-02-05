import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import ItemList from "./ItemList";

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
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen flex flex-col">
      <h1 className="text-2xl font-semibold mb-6 font-roboto">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="Empty Cart"
            className="w-40 h-40 mb-6 opacity-80"
          />
          <p className="text-lg mb-3">Your cart is empty</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Explore Restaurants
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 h-[27rem] overflow-y-auto  premium-scrollbar">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white"
              >
                <ItemList item={item} deleteToggle={true} />
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white border-t-2 shadow-lg mt-6">
            <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-semibold">
                  ₹{Math.ceil(totalPrice)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClearCart}
                  className="px-4 py-2 rounded-lg border text-red-500 border-red-500 cursor-pointer hover:bg-red-50 transition"
                >
                  Clear Cart
                </button>

                <button className="px-6 py-2 rounded-lg bg-green-600 text-white cursor-pointer hover:bg-green-700 transition">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;