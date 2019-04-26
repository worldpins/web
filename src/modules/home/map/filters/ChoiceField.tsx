import * as React from 'react';
import CheckBox from '../../../../common/fields/checkField/CheckBox';
import styled from '../../../../layout/styled';
import { useToggle } from 'react-angler';
import { Label } from '../../../../common/fields/helpers';

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
  grid-template-columns: 1fr;
  gap: 6px;
`;

const Name = styled.h3<{ expanded: boolean }>`
  cursor: pointer;
  font-size: 14px;
  margin-bottom: ${({ expanded }) => expanded ? '6px' : 0};
  margin-top: 0;
`;

const Container = styled.div`
  margin-bottom: 12px;
`;

const StyledLabel = styled(Label)`
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 80%
`;

interface Props {
  choices: string[];
  name: string;
  setFilters: Function;
  value: string[];
}

const ChoiceField: React.FC<Props> = ({ name, choices, setFilters, value }) => {
  const { value: expanded, toggle } = useToggle(false);

  const setFilter = React.useCallback(
    (val, toRemove: boolean) => {
      setFilters((current: any) => {
        const currentValue = current[name] || [];
        if (toRemove) {
          const newValue = currentValue.filter((y: any) => y !== val);
          if (newValue.length === 0) {
            const { [name]: toDel, ...rest } = current;
            return rest;
          }
          return {
            ...current,
            [name]: newValue,
          };
        }
        return {
          ...current,
          [name]: [...currentValue, val],
        };
      });
    },
    []);

  return (
    <Container>
      <Name expanded={expanded} onClick={toggle}>{name} {expanded ? '[-]' : '[+]'}</Name>
      {expanded &&
        <ChoicesWrapper>
          {choices.map((x: string) => (
            <Wrapper key={x}>
              <CheckBox
                checked={value.includes(x)}
                onChange={setFilter.bind(undefined, x, value.includes(x))}
              />
              <StyledLabel>{x}</StyledLabel>
            </Wrapper>
          ))}
        </ChoicesWrapper>}
    </Container>
  );
};

export default React.memo(ChoiceField);
