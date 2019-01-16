import * as React from "react";
import { Form, Field } from "hooked-form";
import { graphql } from "react-apollo";

import { mapQuery } from "../_queries";
import StringField from "../../../common/fields/stringField";
import SelectField from '../../../common/fields/selectField';
import Modal from "../../../common/modal";

import { createPinMutation } from "./_mutations";
import Template from './Template';

interface CreatePinModalProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  createPin: Function;
  mapId?: string;
  onClose: () => void;
  handleSubmit: () => void;
}

const CreatePinModal: React.SFC<CreatePinModalProps> = ({
  onClose,
  handleSubmit,
  templatePins,
  values: { templatePinId, data },
  ...props
}) => {
  const options = React.useMemo(() => templatePins.map(({ id, name }) => ({ value: id, label: name })), []);
  const templatePin = React.useMemo(() => templatePinId && templatePins.find(({ id }) => id === templatePinId), [templatePinId]);
  console.log(data)
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Create Pin"
      onSubmit={handleSubmit}
      buttons={[
        { label: "Close", type: "button", onClick: close, flavor: "danger" },
        { label: "Submit", type: "submit", flavor: "primary" }
      ]}
    >
      <Field
        fieldId="name"
        component={StringField}
        placeholder="Name"
        label="Name"
      />
      <Field
        component={SelectField}
        fieldId="templatePinId"
        label="Choose your template"
        options={options}
      />
      {templatePin && <Template fields={templatePin.fields} />}
    </Modal>
  );
};

const CreatePinFormModal = Form({
  mapPropsToValues: ({ coordinates, templatePins, mapId }) => ({
    templatePinId: templatePins.length === 1 ? templatePins[0].id : '',
    name: '',
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    id: mapId,
  }),
  onSubmit: async (
    values,
    { createPin, coordinates, mapId }: CreatePinModalProps
  ) => {
    await createPin({
      variables: {
        ...values,
      },
      refetchQueries: [{ query: mapQuery, variables: { id: mapId } }]
    });
  }
})(CreatePinModal);

export default graphql<{
  coordinates: object;
  mapId?: string;
  onClose: () => void;
}>(createPinMutation, { name: "createPin" })(CreatePinFormModal);
