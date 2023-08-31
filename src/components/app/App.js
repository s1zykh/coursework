import Graph from "../graph/Graph";
import ControlPanel from "../controlPanel/ControlPanel";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Graph />
        <ControlPanel />
      </div>
    </div>
  );
}

export default App;
