import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRoad, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  toggleActiveAddBtnVertex,
  toggleActiveAddBtnEdge,
} from "./controlPanelSlice";

import "./controlPanel.scss";
const ControlPanel = () => {
  const activeBtnVertex = useSelector((state) => {
    const active = state.controlPanel.activeAddBtnVertex;
    return active ? "buttons__btn buttons__btn-active" : "buttons__btn";
  });
  const activeBtnEdge = useSelector((state) => {
    const active = state.controlPanel.activeAddBtnEdge;
    return active ? "buttons__btn buttons__btn-active" : "buttons__btn";
  });
  const dispatch = useDispatch();

  return (
    <div className="panel">
      <div className="buttons">
        <div
          className={activeBtnVertex}
          onClick={() => {
            dispatch(toggleActiveAddBtnVertex());
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} />
          <div className="buttons__btn-text">Добавить вершину</div>
        </div>
        <div
          className={activeBtnEdge}
          onClick={() => {
            dispatch(toggleActiveAddBtnEdge());
          }}
        >
          <FontAwesomeIcon icon={faRoad} style={{ color: "#000000" }} />
          <div className="buttons__btn-text">Соеденить вершины</div>
        </div>
        <div className="buttons__btn">
          <FontAwesomeIcon icon={faXmark} style={{ color: "#000000" }} />
          <div className="buttons__btn-text">Удалить</div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
