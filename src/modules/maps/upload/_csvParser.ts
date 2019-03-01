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
  console.log(rows);
  const dataCols: string[] = [];
  const [firstRow, secondRow, ...restRows] = rows;

  secondRow.forEach((data, i) => {
    const header = headers.find(h => data.startsWith(h));
    if (header) {
      dataCols[i] = header;
    }
  });

  console.log(dataCols);

  const pins: Pin[] = [];
  restRows.forEach((cols, i) => {
    const entity: Pin = {};
    // TODO: location
    console.log(cols);
    entity.data = dataCols.reduce(
      (acc, header, j) => {
        console.log(header, j);
        if (header) {
          return {
            ...acc,
            [header]: cols[j],
          };
        }
        return acc;
      },
      {});
    entity.name = cols[1];
    const [latitude, longitude] = cols[7].split(';');
    entity.location = { latitude, longitude };
    pins.push(entity);
  });
  console.log(pins);
};

export default parseCsv;
