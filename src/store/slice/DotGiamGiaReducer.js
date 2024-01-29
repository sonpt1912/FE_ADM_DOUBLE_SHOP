import { createSlice } from '@reduxjs/toolkit';

const promoSlice = createSlice({
  name: 'dotgiamgia',
  initialState: {
    promoMessage: '',
  },
  reducers: {
    setPromoMessage: (state, action) => {
      state.promoMessage = action.payload;
    },
  },
});

export const { setPromoMessage } = promoSlice.actions;
export const selectPromoMessage = (state) => state.promo.promoMessage;
export default promoSlice.reducer;