import * as React from 'react';
import ChoiceField from './ChoiceField';
import NumericFilter from './NumericFilter';
import Button from '../../../../common/button';
import styled from '../../../../layout/styled';

interface Props {
  activeFilters: object;
  filters: object;
  setFilters: Function;
}

const ResetButton = styled(Button)`
  margin-bottom: 32px;
`;

const Filters: React.FC<Props> = ({ activeFilters, filters, setFilters }) => {
  const restFilters = React.useCallback(() => {
    setFilters(() => ({}));
  }, []);

  const { choiceKeys, numericKeys } = React.useMemo(() => {
    return Object.keys(filters).reduce((acc, key) => {
      if (filters[key].type === 'choice') {
        // @ts-ignore
        acc.choiceKeys.push(key);
      } else {
        // @ts-ignore
        acc.numericKeys.push(key);
      }
      return acc;
    }, { choiceKeys: [], numericKeys: [] });
  }, []);

  return (
    <React.Fragment>
      <div>
        {choiceKeys.map((property: string) => {
          const { choices } = filters[property];
          return <ChoiceField key={property} value={activeFilters[property] || []} name={property} choices={choices} setFilters={setFilters}  />;
        })}
      </div>
      <div>
        {numericKeys.map((property: string) => {
          const { min, max } = filters[property];
          return <NumericFilter key={property} name={property} min={min} max={max} setFilters={setFilters} value={activeFilters[property]} />;
        })}
      </div>
      <ResetButton onClick={restFilters} label="Reset filters" />
    </React.Fragment>
  )
}


export default React.memo(Filters);
