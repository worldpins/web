// Insert array of columns;
const headers = [
  'ARCHITECT',
  'ZIP CODE',
  'MUNICIPALITY',
  'STREET + NUMBER',
  'YEAR',
  'SIZE',
  'POPULATION SIZE',
  'DENSITY',
  'NUMBER OF UNITS',
  'AFGEWERKT',
  'RENOVATION',
  'EXPLANATION',
  'LAYOUT',
  'TYPES OF COMMUNAL',
  'TYPES OF PRIVATE',
  'BUILDING VOLUMES',
  'CENTRALITY OF INDOOR',
  'PRIVATE SPACE',
  'LOCATION',
  'COMMUNITY COMPLETED',
  'OWNERSHIP',
  'LEGAL FORM',
  'CORE VALUES',
  'RESIDENT PARTICIPATION',
  'ORGANIZED COMMUNAL ACTIVITIES',
  'Shared goods',
  'DECISION-MAKING',
  'HOUSEHOLD TYPE',
  'AGE RANGE',
];

interface Pin {
  name?: string;
  data?: object;
  location?: {
    latitude: number;
    longitude: number;
  };
}

const parseCsv = (rows: any[][]) => {
  const dataCols: string[] = [];
  const [_, secondRow, ...restRows] = rows;

  const coordinatesIndex = secondRow.indexOf('COORDINATES');
  secondRow.forEach((data, i) => {
    const header = headers.find(h => data.startsWith(h));
    if (header) {
      dataCols[i] = header;
    }
  });

  const pins: Pin[] = [];
  restRows.forEach((cols, i) => {
    const entity: Pin = {};
    entity.data = dataCols.reduce(
      (acc, header, j) => {
        if (header) {
          return {
            ...acc,
            [header]: cols[j],
          };
        }
        return acc;
      },
      {});
    entity.name = cols[2];
    const [latitude, longitude] = cols[coordinatesIndex].split(';');
    entity.location = { latitude, longitude };
    pins.push(entity);
  });
};

export default parseCsv;
