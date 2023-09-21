import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVertexes } from "./graphSlice";
import Vertex from "../vertex/Vertex";
import Edge from "../edge/Edge";
import "./graph.scss";

const Graph = () => {
  const vertexes = useSelector((state) => state.graph.vertexes);
  const charac = useSelector((state) => state.graph.characters);
  const activeBtn = useSelector(
    (state) => state.controlPanel.activeAddBtnVertex
  );

  const graphRef = useRef(null);

  const dispacth = useDispatch();

  const onAddVertex = (e) => {
    if (activeBtn) {
      const nameVertex = charac[Object.keys(vertexes).length];
      const rect = graphRef.current.getBoundingClientRect();
      const coorX = e.clientX - rect.left - 17;
      const coorY = e.clientY - rect.top - 15;
      const dataVertex = {
        name: nameVertex,
        coorX,
        coorY,
        edges: [],
      };
      dispacth(addVertexes(nameVertex, dataVertex));
    }
  };

  return (
    <div className="frame" onClick={(e) => onAddVertex(e)} ref={graphRef}>
      {Object.keys(vertexes).map((nameVertex, index) => (
        <Vertex
          key={index}
          name={vertexes[nameVertex].name}
          coorX={vertexes[nameVertex].coorX}
          coorY={vertexes[nameVertex].coorY}
        />
      ))}
      {Object.keys(vertexes).map((nameVertex, index) =>
        vertexes[nameVertex].edges.map((item, i) => (
          <Edge
            key={`${index}-${i}`}
            x1={vertexes[nameVertex].coorX}
            y1={vertexes[nameVertex].coorY}
            x2={item.coorX}
            y2={item.coorY}
          />
        ))
      )}
    </div>
  );
};

export default Graph;
