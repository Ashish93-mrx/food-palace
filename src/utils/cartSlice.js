import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    locationInput: null,
    location: {
      lat: "12.9966135",
      lng: "77.5920581",
      address: "",
    },
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) existingItem.count += 1;
      else state.items.push({ ...item, count: 1 });
    },

    decreaseItem: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload);
      if (idx > -1) {
        if (state.items[idx].count > 1) state.items[idx].count -= 1;
        else state.items.splice(idx, 1);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

    addLocationInput: (state, action) => {
      state.locationInput = action.payload;
    },

    addLocation: (state, action) => {
      const { lat, lng, address } = action.payload;
      state.location.lat = lat;
      state.location.lng = lng;
      state.location.address = address || "";
    },
  },
});

export const {
  addItem,
  decreaseItem,
  removeItem,
  clearCart,
  addLocationInput,
  addLocation,
} = cartSlice.actions;

export default cartSlice.reducer;
