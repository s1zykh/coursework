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
  vertexes: {},
  edges: [],
  activeEdge: null,
  twoVertexes: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    addVertexes: {
      reducer: (state, action) => {
        const { nameVertex, dataVertex } = action.payload;
        state.vertexes[nameVertex] = dataVertex;
      },
      prepare: (nameVertex, dataVertex) => {
        return {
          payload: {
            nameVertex,
            dataVertex,
          },
        };
      },
    },
    addEdges: (state, action) => {
      state.edges.push(action.payload);
    },
    addActiveEdge: (state, action) => {
      state.activeEdge = action.payload;
    },
    addTwoVertexes: (state, action) => {
      if (state.twoVertexes.length !== 2) {
        state.twoVertexes.push(action.payload);
      }
    },
  },
});

const { reducer, actions } = graphSlice;
export const { addVertexes, addEdges, addActiveEdge, addTwoVertexes } = actions;
export default reducer;
