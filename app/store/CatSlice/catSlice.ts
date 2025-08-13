import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormBikinKucingSchema } from '@/app/types/form';

interface CatState {
  selectedCat: FormBikinKucingSchema | null;
}

const initialState: CatState = {
  selectedCat: null,
};

export const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    setSelectedCat: (state, action: PayloadAction<FormBikinKucingSchema | null>) => {
      state.selectedCat = action.payload;
    },
    clearSelectedCat: (state) => {
      state.selectedCat = null;
    },
  },
});

export const { setSelectedCat, clearSelectedCat } = catSlice.actions;

export default catSlice.reducer;
