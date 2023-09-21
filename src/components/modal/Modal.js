import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";

import { updateVertex, twoVertexesClear } from "../graph/graphSlice";
import { algorithmParetoOptimality } from "../controlPanel/controlPanelSlice";

import "./modal.scss";

const Modal = ({
  version,
  toggleBool,
  children,
  isCheckedDistance,
  isCheckedQuality,
}) => {
  const [weightDistance, setWeightDistance] = useState("");
  const [weightQuality, setWeightQuality] = useState("");

  const twoVertexes = useSelector((state) => state.graph.twoVertexes);
  const graph = useSelector((state) => state.graph.vertexes);
  const clsName = useSelector((state) => {
    const vertexes = state.graph.twoVertexes;
    return vertexes.length === 2 || version !== "edge"
      ? "modal"
      : "modal modal__hidden";
  });

  const dispatch = useDispatch();

  const renderChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
      });
    }
    return child;
  });

  const onAddEdges = () => {
    const edge1 = {
      vertex: twoVertexes[1].name,
      coorX: twoVertexes[1].coorX,
      coorY: twoVertexes[1].coorY,
      weightDistance: +weightDistance,
      weightQuality: +weightQuality,
    };
    const edge2 = {
      vertex: twoVertexes[0].name,
      coorX: twoVertexes[0].coorX,
      coorY: twoVertexes[0].coorY,
      weightDistance: +weightDistance,
      weightQuality: +weightQuality,
    };

    dispatch(updateVertex(edge1, twoVertexes[0].name));
    dispatch(updateVertex(edge2, twoVertexes[1].name));
    dispatch(twoVertexesClear());
    setWeightDistance("");
    setWeightQuality("");
  };

  const onAddPathGraph = () => {
    dispatch(
      algorithmParetoOptimality(
        graph,
        weightDistance.toUpperCase(),
        weightQuality.toUpperCase(),
        {
          distance: isCheckedDistance,
          quality: isCheckedQuality,
        }
      )
    );
  };

  return (
    <div className={clsName}>
      <div className="modal__content">
        <div className="modal__header">
          <div className="modal__header-text">
            {version === "edge" ? "Добавить ребро" : "Найти пути"}
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            style={{ color: "#000000", cursor: "pointer" }}
            onClick={() => {
              version === "edge"
                ? dispatch(twoVertexesClear())
                : toggleBool(false);
            }}
          />
        </div>
        <div className="modal__weights">
          <div className="modal__weights-item">
            <div className="modal__weights-item">
              <input
                type="text"
                id="distance"
                placeholder={version === "edge" ? "Дистанция" : "Откуда"}
                onChange={(e) => setWeightDistance(e.target.value)}
                value={weightDistance}
              />
            </div>
            <div className="modal__weights-item">
              <input
                type="text"
                id="quality"
                placeholder={version === "edge" ? "Качество (1-10)" : "Куда"}
                onChange={(e) => setWeightQuality(e.target.value)}
                value={weightQuality}
              />
            </div>
          </div>
          {renderChildren}
        </div>
        <div
          className="btn"
          onClick={() => {
            version === "edge" ? onAddEdges() : onAddPathGraph();
          }}
        >
          {version === "edge" ? "Добавить" : "Найти"}
        </div>
      </div>
    </div>
  );
};

export default Modal;
