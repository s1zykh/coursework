function paretoOptimalSolutions(data) {
  if (data.length === 0) {
    return [];
  }

  const paretoOptimal = [];

  for (let i = 0; i < data.length; i++) {
    let isParetoOptimal = true;

    for (let j = 0; j < data.length; j++) {
      if (
        i !== j &&
        data[i].distance >= data[j].distance &&
        data[i].quality <= data[j].quality
      ) {
        isParetoOptimal = false;
        break;
      }
    }

    if (isParetoOptimal) {
      paretoOptimal.push(data[i]);
    }
  }

  return paretoOptimal;
}

// Пример использования:

const data = [
  { quality: 2, distance: 9 },
  { quality: 8, distance: 3 },
  { quality: 2, distance: 3 },
  { quality: 4, distance: 4 },
  { quality: 4, distance: 1 },
  { quality: 3, distance: 1 },
  { quality: 9, distance: 9 },
];

const paretoOptimal = paretoOptimalSolutions(data);
console.log("Парето-оптимальные решения:", paretoOptimal);
