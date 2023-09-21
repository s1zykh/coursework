import { useSelector } from "react-redux";
import React from "react";
import "./pathTable.scss";

const PathTable = () => {
  const listPaths = useSelector(
    (state) => state.controlPanel.listParetoOptimality
  );

  const viewItemPath = (arr) => {
    if (listPaths.length > 0) {
      return arr.map((item, i) => {
        return (
          <li key={i} className="path">
            <div className="path__name">
              {item.name.map((item, j) => (
                <React.Fragment key={j + i}>
                  <div className="path__name-item">{item}</div>
                  <div className="path__name-item-line"></div>
                </React.Fragment>
              ))}
            </div>
            <div className="path__weights">
              <div className="path__weights-item">р-{item.distance}</div>
              <div className="path__weights-item">к-{item.quality}</div>
            </div>
          </li>
        );
      });
    }
  };

  const view = viewItemPath(listPaths);

  return (
    <div className="pathTable">
      <ul className={listPaths.length > 0 ? "listPaths" : "listPaths hidden"}>
        {view}
      </ul>
    </div>
  );
};

export default PathTable;
