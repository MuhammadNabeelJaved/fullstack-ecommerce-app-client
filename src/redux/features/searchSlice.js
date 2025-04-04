import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  isSearchOpen: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    }
  },
});

// Action creators
export const { setSearchQuery, toggleSearch, closeSearch } = searchSlice.actions;

// Selectors
export const selectSearchQuery = (state) => state.search.query;
export const selectIsSearchOpen = (state) => state.search.isSearchOpen;

export default searchSlice.reducer; 