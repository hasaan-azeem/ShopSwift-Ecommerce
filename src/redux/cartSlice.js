import { createSlice } from '@reduxjs/toolkit';

const savedCart = localStorage.getItem("cart");
const initialState = savedCart 
  ? JSON.parse(savedCart) 
  : { items: [], total: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { _id, size, color } = action.payload;
      const existing = state.items.find(
        i => i._id === _id && i.size === size && i.color === color
      );
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      localStorage.setItem("cart", JSON.stringify({ items: state.items, total: state.total }));
    },
    removeItem: (state, action) => {
      const { _id, size, color } = action.payload;
      state.items = state.items.filter(
        i => !(i._id === _id && i.size === size && i.color === color)
      );
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      localStorage.setItem("cart", JSON.stringify({ items: state.items, total: state.total }));
    },
    updateQuantity: (state, action) => {
      const { _id, size, color, quantity } = action.payload;
      const item = state.items.find(
        i => i._id === _id && i.size === size && i.color === color
      );
      if (item) item.quantity = quantity;
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      localStorage.setItem("cart", JSON.stringify({ items: state.items, total: state.total }));
    },
    clearCart: state => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem("cart");
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;