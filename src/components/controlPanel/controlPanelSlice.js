import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeAddBtnVertex: false,
  activeAddBtnEdge: false,
};

const controlPanelSlice = createSlice({
  name: "controlPanel",
  initialState,
  reducers: {
    toggleActiveAddBtnVertex: (state) => {
      state.activeAddBtnVertex = !state.activeAddBtnVertex;
      state.activeAddBtnEdge = false;
    },
    toggleActiveAddBtnEdge: (state) => {
      state.activeAddBtnEdge = !state.activeAddBtnEdge;
      state.activeAddBtnVertex = false;
    },
  },
});

const { reducer, actions } = controlPanelSlice;

export default reducer;

export const { toggleActiveAddBtnVertex, toggleActiveAddBtnEdge } = actions;
