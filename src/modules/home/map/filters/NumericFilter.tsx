import * as React from 'react';
import styled from '../../../../layout/styled';
import { useToggle } from 'react-angler';
import { Label } from '../../../../common/fields/helpers';

const Input = styled.input`
  width: 75px;
`;

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  > * {
    margin-right: 12px;
  }
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

interface Props {
  min: string;
  name: string;
  max: string;
  value: { min: any, max: any };
  setFilters: Function;
}

const NumericFilter: React.FC<Props> = ({ name, min, max, value, setFilters }) => {
  const { value: expanded, toggle } = useToggle(false);
  const curVal = value || { min, max };

  const onChangeMin = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      const { value: newMin } = e.currentTarget;
      setFilters((cur: object) => ({
        ...cur,
        [name]: {
          max: curVal.max,
          min: newMin,
        },
      }));
    },
    [curVal, setFilters]);

  const onChangeMax = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      const { value: newMax } = e.currentTarget;
      setFilters((cur: object) => ({
        ...cur,
        [name]: {
          max: newMax,
          min: curVal.min,
        },
      }));
    },
    [curVal, setFilters]);

  return (
    <Container>
      <Name expanded={expanded} onClick={toggle}>{name} {expanded ? '[-]' : '[+]'}</Name>
      {expanded &&
        <InputWrapper>
          <ColWrapper>
            <Label>Min</Label>
            <Input onChange={onChangeMin} value={curVal.min} type="number" />
          </ColWrapper>
          <ColWrapper>
            <Label>Max</Label>
            <Input onChange={onChangeMax} value={curVal.max} type="number" />
          </ColWrapper>
        </InputWrapper>}
    </Container>
  );
};

export default React.memo(NumericFilter);
