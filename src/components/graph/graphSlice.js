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
  activeEdge: null,
  twoVertexes: [],
  pathData: {},
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
    updateVertex: {
      reducer: (state, action) => {
        const { edge, nameVertex } = action.payload;
        state.vertexes[nameVertex].edges.push(edge);
      },
      prepare: (edge, nameVertex) => {
        return {
          payload: {
            edge,
            nameVertex,
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
      if (
        state.twoVertexes.length !== 2 &&
        !state.twoVertexes.some((vertex) => vertex.name === action.payload.name)
      ) {
        state.twoVertexes.push(action.payload);
      }
    },
    twoVertexesClear: (state) => {
      state.twoVertexes = [];
    },
    clearDataGraph: (state) => {
      state.vertexes = {};
      state.activeEdge = null;
      state.twoVertexes = [];
    },
    addPathData: (state, action) => {
      state.pathData = action.payload;
    },
  },
});

const { reducer, actions } = graphSlice;
export const {
  addVertexes,
  addEdges,
  addActiveEdge,
  addTwoVertexes,
  updateVertex,
  twoVertexesClear,
  clearDataGraph,
  addPathData,
} = actions;
export default reducer;
