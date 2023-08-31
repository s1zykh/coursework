import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  vertexes: [],
  edges: [],
  activeEdge: null,
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    addVertexes: (state, action) => {
      state.vertexes.push(action.payload);
    },
    addEdges: (state, action) => {
      state.edges.push(action.payload);
    },
    addActiveEdge: (state, action) => {
      state.activeEdge = action.payload;
    },
  },
});

const { reducer, actions } = graphSlice;
export const { addVertexes, addEdges, addActiveEdge } = actions;
export default reducer;
