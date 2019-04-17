import * as React from 'react';
import ChoiceField from './ChoiceField';
import NumericFilter from './NumericFilter';

interface Props {
  activeFilters: object;
  filters: object;
  setFilters: Function;
}

const Filters: React.FC<Props> = ({ activeFilters, filters, setFilters }) => {
  return (
    <React.Fragment>
      {Object.keys(filters).map((property: string) => {
        const { type, choices, min, max } = filters[property];
        switch (type) {
          case 'choice': return <ChoiceField key={property} value={activeFilters[property] || []} name={property} choices={choices} setFilters={setFilters}  />;
          case 'numeric': return <NumericFilter key={property} name={property} min={min} max={max} setFilters={setFilters} value={activeFilters[property]} />;
          default: return <span key={property} />;
        }
      })}
    </React.Fragment>
  )
}


export default Filters;
