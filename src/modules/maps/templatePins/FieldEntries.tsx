import * as React from "react";
import { Field } from "hooked-form";

import StringField from "../../../common/fields/stringField";
import Button from "../../../common/button";
import styled from "../../../layout/styled";

const FieldEntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
`;

const FieldEntry = styled.div`
  margin-bottom: 8px;
`;

interface Props {
  addElement: (field: object) => void;
  removeElement: (index: number) => void;
  values: Array<{
    name: string;
  }>;
}

const FieldEntries: React.SFC<Props> = ({
  addElement,
  removeElement,
  values
}) => {
  const onAdd = React.useCallback(() => addElement({}), [addElement]);
  return (
    <FieldEntriesWrapper>
      <h3>Fields:</h3>
      {values.map((field, fieldId, i) => (
        <FieldEntry key={fieldId}>
          <Field
            component={StringField}
            fieldId={`${fieldId}.name`}
            label={`Field ${i}`}
          />
        </FieldEntry>
      ))}
      <Button onClick={onAdd} label="Add field" type="button" />
    </FieldEntriesWrapper>
  );
};

export default FieldEntries;
