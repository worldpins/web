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
  add: (template: object) => void;
  remove: (index: number) => void;
  fieldId: string;
  values: Template[];
}

const TemplatePin: React.FC<Props> = ({
  add,
  fieldId: arrayFieldId,
  values,
}) => {
  const onAdd = React.useCallback(
    () => add({ fields: [] }),
    [add]);

  return (
    <div>
      <h2>TemplatePins</h2>
      {values.length === 0 ? (
        <p>No Pins Yet</p>
      ) : (
          values.map((pin, i) => {
            const fieldId = `${arrayFieldId}[${i}]`;
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

export default React.memo(TemplatePin);
