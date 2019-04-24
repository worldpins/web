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
  add: (field: object) => void;
  fieldId: string;
  remove: (index: number) => void;
  values: object[];
}

const FieldEntries: React.FC<Props> = ({
  add,
  remove,
  values,
  fieldId: arrayFieldId,
}) => {
  const onAdd = React.useCallback(() => add({}), [add]);
  return (
    <FieldEntriesWrapper>
      <h3>Fields:</h3>
      {values.map((field, i: unknown) => {
        const fieldId = `${arrayFieldId}[${i}]`;
        return (
          <FieldEntry key={fieldId}>
            <Field
              component={StringField}
              fieldId={`${fieldId}.name`}
              label={`Field ${(i as number) + 1}`}
            />
            <Cross onClick={() => remove(i as number)} />
          </FieldEntry>
        );
      })}
      <Button onClick={onAdd} label="Add field" type="button" />
    </FieldEntriesWrapper>
  );
};

export default React.memo(FieldEntries);
