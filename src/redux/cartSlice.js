import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      const { _id, size, color } = action.payload;
      // Same product + same size + same color = increase qty
      const existing = state.items.find(
        i => i._id === _id && i.size === size && i.color === color
      );
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    removeItem: (state, action) => {
      // action.payload = { _id, size, color }
      const { _id, size, color } = action.payload;
      state.items = state.items.filter(
        i => !(i._id === _id && i.size === size && i.color === color)
      );
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { _id, size, color, quantity } = action.payload;
      const item = state.items.find(
        i => i._id === _id && i.size === size && i.color === color
      );
      if (item) item.quantity = quantity;
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    clearCart: state => { state.items = []; state.total = 0; }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;