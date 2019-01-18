import * as React from 'react';
import { Field } from 'hooked-form';

import StringField from '../../../common/fields/stringField';

interface Field {
  name: string;
}

interface Props {
  fields: Field[];
}

const Template: React.FC<Props> = React.memo(({ fields }) => {
  return (
    <React.Fragment>
      {fields.map(({ name }, i) => (
        <Field
          key={i}
          component={StringField}
          fieldId={`data.${name}`}
          placeholder={name}
          label={name}
        />
        ))}
    </React.Fragment>
  );
});

export default Template;
