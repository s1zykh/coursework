//кажется это
function dijkstra(graph, start, end) {
  const distances = {};
  const qualities = {};

  for (let vertex in graph) {
    distances[vertex] = Infinity;
    qualities[vertex] = Infinity;
  }
  distances[start] = 0;
  qualities[start] = 0;

  const previousVertices = {};
  const visited = {};

  function findClosestVertex() {
    let closestVertex = null;
    for (let vertex in distances) {
      if (
        !visited[vertex] &&
        (closestVertex === null ||
          calculateWeight(vertex) < calculateWeight(closestVertex))
      ) {
        closestVertex = vertex;
      }
    }
    return closestVertex;
  }

  function calculateWeight(vertex) {
    return 0.4 * distances[vertex] + 0.6 * qualities[vertex];
  }

  while (true) {
    const closestVertex = findClosestVertex();
    if (closestVertex === null) {
      break;
    }

    visited[closestVertex] = true;

    for (let edge of graph[closestVertex].edges) {
      const neighborVertex = edge.vertex;
      const edgeDistance = edge.distance;
      const edgeQuality = edge.quality;
      const totalDistance = distances[closestVertex] + edgeDistance;
      const totalQuality = qualities[closestVertex] + edgeQuality;

      if (totalDistance < distances[neighborVertex]) {
        distances[neighborVertex] = totalDistance;
        qualities[neighborVertex] = totalQuality;
        previousVertices[neighborVertex] = closestVertex;
      }
    }
  }

  const shortestPath = [];
  let currentVertex = end;
  while (currentVertex !== start) {
    shortestPath.unshift(currentVertex);
    currentVertex = previousVertices[currentVertex];
  }
  shortestPath.unshift(start);

  return shortestPath;
}
