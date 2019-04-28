// Insert array of columns;
const headers = [
  'TYPE OF COLLABORATIVE COMMUNITY',
  'ARCHITECT',
  'ZIP CODE',
  'MUNICIPALITY',
  'STREET + NUMBER',
  'YEAR',
  'SIZE',
  'NUMBER OF RESIDENTS',
  'NUMBER OF UNITS',
  'PROJECT STATUS',
  'TYPE OF CONSTRUCTION',
  'LAYOUT',
  'TYPES OF COMMUNAL',
  'TYPES OF PRIVATE',
  'BUILDING VOLUMES',
  'CENTRALITY OF INDOOR',
  'PRIVATE SPACE (RANGE UNIT SIZE [M²])',
  'LOCATION',
  'COMMUNITY COMPLETED',
  'CORE VALUES',
  'OWNERSHIP',
  'LEGAL FORM',
  'RESIDENT PARTICIPATION',
  'ORGANIZED COMMUNAL ACTIVITIES',
  'Shared goods',
  'DECISION-MAKING PROCESS',
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
  'Size [m²]',
  'Number of residents',
  'Number of units',
  'Project status',
  'Type of construction',
  'Layout',
  'Types of communal spaces',
  'Types of private spaces',
  'Building volumes',
  'Centrality of indoor',
  'Size of the private units [m²]',
  'Location',
  'Community completed',
  'Core values',
  'Ownership',
  'Legal form',
  'Resident participation',
  'Organized communal activities',
  'Shared goods',
  'Decision-making process',
  'Household type',
  'Age range',
];

const headerMapping = {
  'AGE RANGE': 'Age range',
  ARCHITECT: 'Architect',
  'BUILDING VOLUMES': 'Building volumes',
  'CENTRALITY OF INDOOR': 'Centrality of indoor',
  'COMMUNITY COMPLETED': 'Community completed',
  'CORE VALUES': 'Core values',
  'DECISION-MAKING PROCESS': 'Decision-making process',
  'HOUSEHOLD TYPE': 'Household type',
  LAYOUT: 'Layout',
  'LEGAL FORM': 'Legal form',
  LOCATION: 'Location',
  MUNICIPALITY: 'Municipality',
  'NUMBER OF RESIDENTS': 'Number of residents',
  'NUMBER OF UNITS': 'Number of units',
  'ORGANIZED COMMUNAL ACTIVITIES': 'Organized communal activities',
  OWNERSHIP: 'Ownership',
  'PRIVATE SPACE (RANGE UNIT SIZE [M²])': 'Size of the private units [m²]',
  'PROJECT STATUS': 'Project status',
  'RESIDENT PARTICIPATION': 'Resident participation',
  SIZE: 'Size [m²]',
  'STREET + NUMBER': 'Street',
  'Shared goods': 'Shared goods',
  'TYPE OF COLLABORATIVE COMMUNITY': 'Type of collaborative community',
  'TYPE OF CONSTRUCTION': 'Type of construction',
  'TYPES OF COMMUNAL': 'Types of communal spaces',
  'TYPES OF PRIVATE': 'Types of private spaces',
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
    const header = headers.find(h => data.toLowerCase().includes(h.toLowerCase()));
    if (header) dataCols[i] = header;
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
        if (header) return { ...acc, [headerMapping[header]]: cols[j] };
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
