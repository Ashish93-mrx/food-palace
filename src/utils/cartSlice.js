import { createSlice } from "@reduxjs/toolkit";

//configuration
const cartSlice = createSlice({
    name: 'cart', 
    initialState: {
        items: []
    },

    //below key 'addItem' is the action and it's value function is the reducer function
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
      
            if (existingItem) {
              existingItem.count += 1;
            } else {
              state.items.push({ ...item, count: 1 });
            }
          },
      
          decreaseItem: (state, action) => {
            const itemIndex = state.items.findIndex((i) => i.id === action.payload);
            if (itemIndex > -1) {
              if (state.items[itemIndex].count > 1) {
                state.items[itemIndex].count -= 1;
              } else {
                state.items.splice(itemIndex, 1);
              }
            }
          },
      
          removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(i => i.id !== itemId);
          },
      

        clearCart: (state) => {
            state.items.length = 0;
        }
    },

});

export const { addItem, decreaseItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;