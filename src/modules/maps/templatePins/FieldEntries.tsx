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
      {values.map((field, fieldId) => (
        <div key={fieldId}>
          <Field
            component={StringField}
            fieldId={`${fieldId}.name`}
          />
        </div>
      ))}
      <Button onClick={onAdd} label="Add field" />
    </div>
  )
}

export default FieldEntries;
