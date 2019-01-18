import * as React from 'react';
import { Field, FieldArray } from 'hooked-form';

import StringField from '../../../common/fields/stringField';
import Button from '../../../common/button';

import FieldEntries from './FieldEntries';

interface Field {
  name: string;
}

interface Template {
  comment: string;
  fields: Field[];
  name: string;
}

interface Props {
  addElement: (template: object) => void;
  removeElement: (index: number) => void;
  values: Template[];
}

const TemplatePin: React.SFC<Props> = ({
  addElement,
  removeElement,
  values,
}) => {
  const onAdd = React.useCallback(
    () => addElement({ fields: [] }),
    [addElement]);
  return (
    <div>
      <h2>TemplatePins</h2>
      {values.length === 0 ? (
        <p>No Pins Yet</p>
      ) : (
          values.map((pin, fieldId) => {
            return (
              <div key={fieldId}>
                <Field
                  component={StringField}
                  fieldId={`${fieldId}.name`}
                  placeholder="name"
                  label="name"
                />
                <Field
                  component={StringField}
                  fieldId={`${fieldId}.comment`}
                  placeholder="comment"
                  label="comment"
                />
                <FieldArray
                  component={FieldEntries}
                  fieldId={`${fieldId}.fields`}
                />
              </div>
            );
          })
        )}
      <Button label="Add template" onClick={onAdd} type="button" />
    </div>
  );
};

export default TemplatePin;
