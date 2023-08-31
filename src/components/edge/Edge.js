import { useEffect } from "react";
import "./edge.scss";
const Edge = ({ x1, y1, x2, y2 }) => {
  // const midX = (x1 + x2) / 2 + 200;
  // const midY = (y1 + y2) / 2;

  // useEffect(() => {
  //   console.log(x1, y1, x2, y2);
  // });

  // const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  // const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // return (
  //   <div
  //     className="edge"
  //     style={{
  //       left: midX,
  //       top: midY,
  //       width: length,
  //       transform: `rotate(${angle}deg)`,
  //     }}
  //   ></div>
  // );
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  return (
    <div
      className="line"
      style={{
        backgroundColor: "black",
        zIndex: "-1",
        height: "2px",
        position: "absolute",
        left: x1 + 15,
        top: y1 + 12,
        width: length,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 0", // Указываем точку вращения в начале линии
      }}
    ></div>
  );
};

export default Edge;
