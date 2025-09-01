import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLink: "/",
};

const activeLinkSlice = createSlice({
  name: "activeLink",
  initialState,
  reducers: {
    setActiveLink(state, action) {
      const link = action.payload;
      state.activeLink = link;
    },
  },
});

export const { setActiveLink } = activeLinkSlice.actions;

export default activeLinkSlice.reducer;
