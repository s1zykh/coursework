import { createSlice } from "@reduxjs/toolkit";
import Graph from "../../utils/graph";

const initialState = {
  activeAddBtnVertex: false,
  activeAddBtnEdge: false,
  listParetoOptimality: [],
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
    clearDataPanel: (state) => {
      state.activeAddBtnVertex = false;
      state.activeAddBtnEdge = false;
      state.listParetoOptimality = [];
    },
    algorithmParetoOptimality: {
      reducer: (state, action) => {
        const g = new Graph();
        let check;
        const { graph, start, end, checkbox } = action.payload;
        if (checkbox.distance) {
          check = "distance";
        } else if (checkbox.quality) {
          check = "quality";
        }
        state.listParetoOptimality = g.paretoOptimalSolutions(
          graph,
          start,
          end,
          check
        );
      },
      prepare: (graph, start, end, checkbox) => {
        return {
          payload: {
            graph,
            start,
            end,
            checkbox,
          },
        };
      },
    },
  },
});

const { reducer, actions } = controlPanelSlice;

export default reducer;

export const {
  toggleActiveAddBtnVertex,
  toggleActiveAddBtnEdge,
  algorithmParetoOptimality,
  clearDataPanel,
} = actions;
