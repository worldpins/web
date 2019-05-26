import * as React from 'react';
import { Field } from 'hooked-form';

import StringField from '../../../common/fields/stringField';

interface Props {
  fields: string[];
}

const Template: React.FC<Props> = ({ fields }) => (
  <React.Fragment>
    {fields.map((name, i) => (
      <React.Fragment key={name}>
        <Field
          component={StringField}
          fieldId={`data.${name}`}
          placeholder={name}
          label={name}
        />
      </React.Fragment>
      ))}
  </React.Fragment>
);

export default React.memo(Template);
