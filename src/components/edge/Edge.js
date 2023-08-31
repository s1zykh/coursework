import "./edge.scss";
const Edge = ({ x1, y1, x2, y2 }) => {
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
        transformOrigin: "0 0",
      }}
    ></div>
  );
};

export default Edge;
