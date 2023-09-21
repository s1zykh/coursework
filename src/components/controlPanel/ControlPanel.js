import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faGear,
  faCircleNodes,
} from "@fortawesome/free-solid-svg-icons";

import Modal from "../modal/Modal";
import PathTable from "../pathTable/PathTable";
import {
  toggleActiveAddBtnVertex,
  toggleActiveAddBtnEdge,
  clearDataPanel,
} from "./controlPanelSlice";
import { clearDataGraph } from "../graph/graphSlice";

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
  const graph = useSelector((state) => state.graph.vertexes);

  const [isCheckedDistance, setIsCheckedDistance] = useState(false);
  const [isCheckedQuality, setIsCheckedQuality] = useState(false);
  const [isCheckedDefualt, setIsCheckedDefualt] = useState(true);

  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);

  const handleCheckboxChange = (e) => {
    if (e.target.name === "distance") {
      setIsCheckedDistance(e.target.checked);
      setIsCheckedQuality(false);
      setIsCheckedDefualt(false);
    } else if (e.target.name === "quality") {
      setIsCheckedQuality(e.target.checked);
      setIsCheckedDistance(false);
      setIsCheckedDefualt(false);
    } else {
      setIsCheckedDefualt(e.target.checked);
      setIsCheckedDistance(false);
      setIsCheckedQuality(false);
    }
  };

  return (
    <>
      <Modal version={"edge"} />
      {Object.keys(graph).length > 0 && isModal ? (
        <Modal
          version={"path"}
          toggleBool={(a) => setIsModal(a)}
          isCheckedDistance={isCheckedDistance}
          isCheckedQuality={isCheckedQuality}
        >
          <div className="modal__weights-prioritet">
            <div className="modal__weights-prioritet-item">
              {" "}
              <input
                type="checkbox"
                name="defualt"
                onChange={(e) => handleCheckboxChange(e)}
                checked={isCheckedDefualt}
              />
              <label htmlFor="defualt">Нет</label>
            </div>
            <div className="modal__weights-prioritet-item">
              {" "}
              <input
                type="checkbox"
                name="distance"
                onChange={(e) => handleCheckboxChange(e)}
                checked={isCheckedDistance}
              />
              <label htmlFor="distance">Расстояние</label>
            </div>
            <div className="modal__weights-prioritet-item">
              <input
                type="checkbox"
                name="quality"
                onChange={(e) => handleCheckboxChange(e)}
                checked={isCheckedQuality}
              />
              <label htmlFor="quality">Качество</label>
            </div>
          </div>
        </Modal>
      ) : null}
      <div className="panel">
        <div className="buttons">
          <div className="buttons-left">
            <div
              className={activeBtnVertex}
              onClick={() => {
                dispatch(toggleActiveAddBtnVertex());
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "#000000" }}
                className="fontIcon"
              />
              <div className="buttons__btn-text">Добавить вершину</div>
            </div>
            <div
              className={activeBtnEdge}
              onClick={() => {
                dispatch(toggleActiveAddBtnEdge());
              }}
            >
              <FontAwesomeIcon
                icon={faCircleNodes}
                style={{ color: "#000000" }}
                className="fontIcon"
              />
              <div className="buttons__btn-text">Соединить вершины</div>
            </div>
            <div
              className="buttons__btn"
              onClick={() => {
                dispatch(clearDataPanel());
                dispatch(clearDataGraph());
              }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#000000" }}
                className="fontIcon"
              />
              <div className="buttons__btn-text">Удалить</div>
            </div>
          </div>
          <div className="buttons-right">
            <PathTable />
            <div className="buttons__btn" onClick={() => setIsModal(true)}>
              <FontAwesomeIcon icon={faGear} style={{ color: "#000000" }} />
              <div className="buttons__btn-text">Алгоритмы</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
