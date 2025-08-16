import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PesananState {
  pesananId: string | null;
}

const initialState: PesananState = {
  pesananId: null,
};

const pesananSlice = createSlice({
  name: 'pesanan',
  initialState,
  reducers: {
    setPesananId: (state, action: PayloadAction<string>) => {
      state.pesananId = action.payload;
    },
    clearPesananId: (state) => {
      state.pesananId = null;
    },
  },
});

export const { setPesananId, clearPesananId } = pesananSlice.actions;
export default pesananSlice.reducer;
