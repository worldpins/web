import * as React from 'react';
import { Field } from 'hooked-form';

import StringField from '../../../common/fields/stringField';
import Button from '../../../common/button';

interface Props {
  addElement: (field: object) => void;
  removeElement: (index: number) => void;
  values: Array<{
    name: string;
  }>
}

const FieldEntries: React.SFC<Props> = ({ addElement, removeElement, values }) => {
  const onAdd = React.useCallback(() => addElement({}), [addElement]);
  return (
    <div>
      <h3>Fields:</h3>
      {values.map((field, fieldId, i) => (
        <div key={fieldId}>
          <Field
            component={StringField}
            fieldId={`${fieldId}.name`}
            label={`Field ${i}`}
          />
        </div>
      ))}
      <Button onClick={onAdd} label="Add field" type="button" />
    </div>
  )
}

export default FieldEntries;
