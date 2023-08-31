import { useSelector } from "react-redux";
import { addActiveEdge } from "../graph/graphSlice";
import { useDispatch } from "react-redux";
import "./vertex.scss";

const Vertex = ({ name, coorX, coorY }) => {
  const dispatch = useDispatch();
  const activeСonnectionVertices = useSelector((state) => {
    const active = state.controlPanel.activeAddBtnEdge;
    return active ? "vertex vertex__active" : "vertex";
  });
  return (
    <div
      className={activeСonnectionVertices}
      onClick={() => dispatch(addActiveEdge({ name, coorX, coorY }))}
      style={{
        left: coorX,
        top: coorY,
      }}
    >
      <div className="vertex__name">{name}</div>
    </div>
  );
};

export default Vertex;
