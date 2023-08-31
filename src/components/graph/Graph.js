import { useRef } from "react";
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
      const alp = charac[vertexes.length];
      const rect = graphRef.current.getBoundingClientRect();
      const coorX = e.clientX - rect.left - 17;
      const coorY = e.clientY - rect.top - 15;
      const newVertex = {
        name: alp,
        coorX,
        coorY,
      };
      dispacth(addVertexes(newVertex));
    }
  };

  return (
    <div className="frame" onClick={(e) => onAddVertex(e)} ref={graphRef}>
      {vertexes.map((vertex, index) => (
        <Vertex
          key={index}
          name={vertex.name}
          coorX={vertex.coorX}
          coorY={vertex.coorY}
        />
      ))}

      <Edge x1={174} y1={386} x2={618} y2={339} />
      <Edge x1={618} y1={339} x2={673} y2={461} />
      <Edge x1={174} y1={386} x2={673} y2={461} />
    </div>
  );
};

export default Graph;
