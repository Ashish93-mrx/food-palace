export const API_BASE =
  import.meta.env.MODE === "development"
    ? ""
    : "https://yt-suggest-backend.vercel.app";

export const RESTAURANT_URL =
  "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

export const CORS_API = "temp_9dfcf6835ec787f9b9945118451b2d29";

export const CON_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660";

//  export const LOGO_URL = "https://static.vecteezy.com/system/resources/previews/011/468/885/non_2x/food-logo-spoon-fork-icon-illustration-symbol-for-fast-delivery-app-restaurant-template-free-vector.jpg";
//  export const LOGO_URL = "https://i.pinimg.com/originals/4b/7b/d7/4b7bd7f98e8217f4d050be04db230af8.png";
export const LOGO_URL =
  "https://i.pinimg.com/originals/4b/7b/d7/4b7bd7f98e8217f4d050be04db230af8.png";

  export const MENU_API =
  import.meta.env.MODE === "development"
    ? "/api/menu"
    : "https://yt-suggest-backend.vercel.app/api/menu";


//  export const MENU_API = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9801436&lng=77.5685724&restaurantId="
//  export const MENU_API = "https://swadseva-server.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&restaurantId=5935"

//  export const GEO_LOC = "https://ash-yt-backend-vaz5.vercel.app/suggest?loc="

export const GEO_LOC =
  import.meta.env.MODE === "development"
    ? "/api/reverse-geocode"
    : "https://yt-suggest-backend.vercel.app/api/reverse-geocode";

// export const MENU_API =
//   "https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&catalog_qa=undefined&submitAction=ENTER&restaurantId=";
