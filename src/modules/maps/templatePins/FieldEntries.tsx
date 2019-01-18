import * as React from 'react';
import { Field } from 'hooked-form';

import StringField from '../../../common/fields/stringField';
import Button from '../../../common/button';
import styled from '../../../layout/styled';
import Cross from '../../../common/modal/cross';

const FieldEntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding-left: 12px;
`;

const FieldEntry = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
  > div {
    margin-right: 6px;
    width: 95%;
  }
  > svg {
    width: 16px;
    stroke: ${({ theme }) =>  theme.danger};
  }
`;

interface Props {
  addElement: (field: object) => void;
  removeElement: (index: number) => void;
  values: object[];
}

const FieldEntries: React.FC<Props> = ({
  addElement,
  removeElement,
  values,
}) => {
  const onAdd = React.useCallback(() => addElement({}), [addElement]);
  return (
    <FieldEntriesWrapper>
      <h3>Fields:</h3>
      {values.map((field, fieldId, i: unknown) => {
        return (
          <FieldEntry key={fieldId}>
            <Field
              component={StringField}
              fieldId={`${fieldId}.name`}
              label={`Field ${(i as number) + 1}`}
            />
            <Cross onClick={() => removeElement(i as number)} />
          </FieldEntry>
        );
      })}
      <Button onClick={onAdd} label="Add field" type="button" />
    </FieldEntriesWrapper>
  );
};

export default FieldEntries;
