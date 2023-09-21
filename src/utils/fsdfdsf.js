// function paretoOptimalSolutions(data, priority = "default") {
//   let paretoOptimal = [];

//   if (data.length === 0) {
//     return [];
//   }

//   function compare(a, b) {
//     if (priority === "quality") {
//       return b.quality - a.quality || a.distance - b.distance;
//     } else if (priority === "distance") {
//       return a.distance - b.distance || b.quality - a.quality;
//     }
//   }
//   if (priority !== "default") {
//     data.sort(compare);
//   }
//   const n = priority !== "default" ? paretoOptimal.length : data.length;

//   for (let i = 0; i < data.length; i++) {
//     let isParetoOptimal = true;

//     for (let j = 0; j < n; j++) {
//       if (
//         (priority === "quality" &&
//           data[i].distance <= paretoOptimal[j].distance &&
//           data[i].quality > paretoOptimal[j].quality) ||
//         (priority === "distance" &&
//           data[i].quality >= paretoOptimal[j].quality &&
//           data[i].distance < paretoOptimal[j].distance) ||
//         (priority === "default" &&
//           i !== j &&
//           data[i].distance >= data[j].distance &&
//           data[i].quality <= data[j].quality)
//       ) {
//         isParetoOptimal = false;
//         break;
//       }
//     }

//     if (isParetoOptimal) {
//       paretoOptimal.push(data[i]);
//     }
//   }

//   return paretoOptimal;
// }

// // Пример использования:

// const data = [
//   { quality: 4, distance: 5 },
//   { quality: 9, distance: 12 },
//   { quality: 1, distance: 1 },
//   { quality: 5, distance: 3 },
//   { quality: 10, distance: 5 },
//   { quality: 7, distance: 8 },
// ];

// const paretoOptimal = paretoOptimalSolutions(data);
// console.log("Парето-оптимальные решения (без приоритета):", paretoOptimal);

function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const queue = [];
  const distanceWeight = 0.4;
  const qualityWeight = 0.6;
  for (const vertex in graph) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }
  distances[start] = 0;
  queue.push({ vertex: start, priority: 0 });

  while (queue.length > 0) {
    queue.sort((a, b) => a.priority - b.priority);
    const { vertex: currentVertex, priority: currentPriority } = queue.shift();

    if (currentVertex === end) {
      const path = [];
      let vertex = end;
      while (vertex !== null) {
        path.unshift(vertex);
        vertex = previous[vertex];
      }
      return path;
    }

    if (currentPriority > distances[currentVertex]) {
      continue;
    }

    for (const neighbor in graph[currentVertex]) {
      const { quality, distance } = graph[currentVertex][neighbor];
      const altQualityWeightedDistance =
        distances[currentVertex] +
        quality * qualityWeight +
        distance * distanceWeight;

      if (altQualityWeightedDistance < distances[neighbor]) {
        distances[neighbor] = altQualityWeightedDistance;
        previous[neighbor] = currentVertex;
        queue.push({ vertex: neighbor, priority: altQualityWeightedDistance });
      }
    }
  }
  return null;
}

// Пример графа с весами для качества дороги и расстояния
const graph = {
  A: { B: { quality: 0.8, distance: 5 }, C: { quality: 0.6, distance: 3 } },
  B: { D: { quality: 0.7, distance: 2 } },
  C: { D: { quality: 0.9, distance: 4 } },
  D: {},
};

const startVertex = "A";
const endVertex = "D";

const shortestPath = dijkstra(graph, startVertex, endVertex);

if (shortestPath) {
  console.log("Кратчайший путь:", shortestPath);
} else {
  console.log("Путь не найден.");
}
