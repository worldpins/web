import * as React from 'react';
import { Field } from 'hooked-form';

import StringField from "../../../common/fields/stringField";

const Template = ({ fields }) => {
  return (
    fields.map(({ name }, i) => (
      <Field
        key={i}
        component={StringField}
        fieldId={`data.${name}`}
        placeholder={name}
        label={name}
      />
    ))
  )
}

export default Template
