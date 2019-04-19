import * as React from 'react';
import styled from '../../../../layout/styled';
import { useToggle } from 'react-angler';

const Thumb = styled.div<{ inset: number }>`
  background: blue;
  border: 1px solid transparent;
  border-radius: 100%;
  cursor: grab;
  position: absolute;
  bottom: -8px;
  left: ${({ inset }) => inset}%;
  height: 16px;
  width: 16px;
  z-index: 999;
`;

const BarWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid black;
  display: flex;
  position: relative;
  margin-bottom: 32px;
`;

const Slot = styled.div<{ inset: number }>`
  border-right: 1px solid black;
  position: absolute;
  bottom: -8px;
  left: ${({ inset }) => inset}%;
  height: 16px;
  width: 8px;
  text-align: bottom;
  > p {
    margin: 0;
    position: absolute;
    bottom: -16px;
  }
`;

const Name = styled.h3`
  cursor: pointer;
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
  const sliderType = React.useRef<string | null>();
  const curVal = value || { min, max };
  const step = React.useMemo(() => (Number(max) - Number(min)) / 10, [min, max]);
  let points = React.useMemo(() => {
    const array = [];
    for (let i = 0; i<11; i++) {
      array[i] = Number(min) + (step * i);
    }
    return array;
  }, [min, step]);


  const onDragOver = React.useCallback((e) => void e.preventDefault(), []);

  const onDragStart = React.useCallback((e: any) => {
    let slider  = e.target.dataset.slider;
    sliderType.current = slider;
 }, [])

  const onDrop = React.useCallback((e) => {
    let source = sliderType.current;
    let slot = Number(e.target.dataset.slot);
    if (isNaN(slot)) return;
    if (source === "min") {
      setFilters((cur: object) => ({
        ...cur,
        [name]: {
          min: slot,
          max: curVal.max,
        }
      }))
    }
    if (source === "max") {
      setFilters((cur: object) => ({
        ...cur,
        [name]: {
          min: curVal.min,
          max: slot,
        }
      }))
    }
    sliderType.current = null;
  }, [curVal]);

  return (
    <div>
      <Name onClick={toggle}>{name} {expanded ? '[-]' : '[+]'}</Name>
      {expanded &&
        <BarWrapper onDragOver={onDragOver}>
          {points.map((n, i) => {
            const inset = i * 10;
            if (n===Number(curVal.min)) {
              return (
                <React.Fragment key={n}>
                  <Thumb title={`${n}`} data-slider="min" draggable inset={inset} onDragStart={onDragStart} />
                  <Slot data-slot={n} inset={inset} onDragOver={onDrop}>
                    <p>{n}</p>
                  </Slot>
                </React.Fragment>
                );
            } else if (n===Number(curVal.max)) {
              return (
                <React.Fragment key={n}>
                  <Thumb title={`${n}`} data-slider="max" draggable inset={inset} onDragStart={onDragStart} />
                  <Slot data-slot={n} inset={inset} onDragOver={onDrop}>
                    <p>{n}</p>
                  </Slot>
                </React.Fragment>
              )
            } else {
              return (
                <Slot data-slot={n} inset={inset} onDragOver={onDrop}>
                  <p>{n}</p>
                </Slot>
              )
            }
          })}
        </BarWrapper>}
    </div>
  )
}

export default NumericFilter;
