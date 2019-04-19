import * as React from 'react';
import CheckBox from '../../../../common/fields/checkField/CheckBox';
import styled from '../../../../layout/styled';
import { useToggle } from 'react-angler';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  > p {
    margin: 0;
    margin-left: 6px;
  }
`;

const ChoicesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
`;

const Name = styled.h3`
  cursor: pointer;
`;

interface Props {
  choices: string[];
  name: string;
  setFilters: Function;
  value: string[];
}

const ChoiceField: React.FC<Props> = ({ name, choices, setFilters, value }) => {
  const { value: expanded, toggle } = useToggle(false);
  const setFilter = React.useCallback((value, toRemove: boolean) => {
    setFilters((current: any) => {
      const currentValue = current[name] || [];
      if (toRemove) {
        const newValue = currentValue.filter((y: any) => y!==value);
        if (newValue.length===0) {
          const { [name]: toDel, ...rest } = current;
          return rest;
        }
        return {
          ...current,
          [name]: newValue,
        }
      } else {
        return {
          ...current,
          [name]: [...currentValue, value],
        }
      }
    });
  }, []);
  return (
    <div>
      <Name onClick={toggle}>{name} {expanded ? '[-]' : '[+]'}</Name>
      {expanded &&
        <ChoicesWrapper>
          {choices.map((x: string) => (
            <Wrapper key={x}>
              <CheckBox checked={value.includes(x)} onChange={setFilter.bind(undefined, x, value.includes(x))} />
              <p>{x}</p>
            </Wrapper>
          ))}
        </ChoicesWrapper>}
    </div>
  )
}

export default ChoiceField;
