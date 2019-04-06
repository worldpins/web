// Insert array of columns;
const headers = [
  'TYPE OF COLLABORATIVE COMMUNITY',
  'ARCHITECT',
  'ZIP CODE',
  'MUNICIPALITY',
  'STREET + NUMBER',
  'YEAR',
  'SIZE',
  'POPULATION SIZE',
  'DENSITY',
  'NUMBER OF UNITS',
  'FINISHED',
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
  'COMMUNITY FOCUS',
  'OWNERSHIP',
  'LEGAL FORM',
  'RESIDENT PARTICIPATION',
  'ORGANIZED COMMUNAL ACTIVITIES',
  'Shared goods',
  'DECISION-MAKING',
  'HOUSEHOLD TYPE',
  'AGE RANGE',
];

const headersSorted = [
  'Age range',
  'Architect',
  'Zip code',
  'Municipality',
  'Street',
  'Year',
  'Size',
  'Population',
  'Density',
  'Number of units',
  'Finished',
  'Renovation',
  'Explanation',
  'Layout',
  'Types of communal',
  'Types of private',
  'Building volumes',
  'Centrality of indoor',
  'Private space',
  'Location',
  'Community completed',
  'Community focus',
  'Ownership',
  'Legal form',
  'Resident participation',
  'Organized communal activities',
  'Shared goods',
  'Decision-making',
  'Household type',
  'Age range',
];

const headerMapping = {
  'AGE RANGE': 'Age range',
  ARCHITECT: 'Architect',
  'BUILDING VOLUMES': 'Building volumes',
  'CENTRALITY OF INDOOR': 'Centrality of indoor',
  'COMMUNITY COMPLETED': 'Community completed',
  'COMMUNITY FOCUS': 'Community focus',
  'DECISION-MAKING': 'Decision-making',
  DENSITY: 'Density',
  EXPLANATION: 'Explanation',
  FINISHED: 'Finished',
  'HOUSEHOLD TYPE': 'Household type',
  LAYOUT: 'Layout',
  'LEGAL FORM': 'Legal form',
  LOCATION: 'Location',
  MUNICIPALITY: 'Municipality',
  'NUMBER OF UNITS': 'Number of units',
  'ORGANIZED COMMUNAL ACTIVITIES': 'Organized communal activities',
  OWNERSHIP: 'Ownership',
  'POPULATION SIZE': 'Population',
  'PRIVATE SPACE': 'Private space',
  RENOVATION: 'Renovation',
  'RESIDENT PARTICIPATION': 'Resident participation',
  SIZE: 'Size',
  'STREET + NUMBER': 'Street',
  'Shared goods': 'Shared goods',
  'TYPE OF COLLABORATIVE COMMUNITY': 'Type of collaborative community',
  'TYPES OF COMMUNAL': 'Types of communal',
  'TYPES OF PRIVATE': 'Types of private',
  YEAR: 'Year',
  'ZIP CODE': 'Zipcode',
};

interface Pin {
  name?: string;
  data?: object;
  location?: {
    latitude: number;
    longitude: number;
  };
}

interface TemplatePin {
  fields: string[];
  name: string;
}

interface GeneratedMap {
  name: string;
  pins: Pin[];
  templatePins: TemplatePin[];
}

const COORDINATES_COL_NAME = 'COORDINATES';
const NAME_COL_INDEX = 2;

const parseCsv = (rows: any[][], name: string): GeneratedMap => {
  const dataCols: string[] = [];
  const [, secondRow, ...restRows] = rows;
  const coordinatesIndex = secondRow.indexOf(COORDINATES_COL_NAME);

  secondRow.forEach((data, i) => {
    const header = headers.find(h => data.startsWith(h));
    if (header) {
      dataCols[i] = header;
    }
  });

  const pins: Pin[] = [];
  // Make a generic template pin, this one will be used for all pins.
  const templatePin: TemplatePin = {
    fields: Object.values(headerMapping).sort((h1, h2) =>
      headersSorted.indexOf(h1) - headersSorted.indexOf(h2)),
    name: 'Generated_Template_Pin',
  };

  restRows.forEach((cols, i) => {
    if (!cols[2]) return;
    const entity: Pin = {};
    // Populate data object.
    entity.data = dataCols.reduce(
      (acc, header, j) => {
        if (header) {
          return {
            ...acc,
            [headerMapping[header]]: cols[j],
          };
        }
        return acc;
      },
      {});
    // Supply the name for this pin.
    entity.name = cols[NAME_COL_INDEX];
    // Suply the location for this pin.
    const [latitude, longitude] = cols[coordinatesIndex].split(';');
    entity.location = { latitude, longitude };
    // Push it on to the collection.
    pins.push(entity);
  });

  return {
    name,
    pins,
    templatePins: [templatePin],
  };
};

export default parseCsv;
