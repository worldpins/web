import * as React from 'react';
import { Form, Field } from 'hooked-form';
import { graphql } from 'react-apollo';

import { createPinMutation } from './_mutations';
import { mapQuery } from '../_queries';
import StringField from '../../../common/fields/stringField';
import Modal from '../../../common/modal';

interface CreatePinModalProps {
  coordinates: {
    lat: number;
    lng: number;
  }
  createPin: Function;
  mapId?: string;
  onClose: () => void;
  handleSubmit: () => void;
}

const CreatePinModal: React.SFC<CreatePinModalProps> = ({ onClose, handleSubmit }) => {
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Create Pin"
    >
      <form onSubmit={handleSubmit}>
        <Field
          fieldId="name"
          component={StringField}
          placeholder="Name"
          label="Name"
        />
      </form>
    </Modal>
  )
}

const CreatePinFormModal = Form({
  onSubmit: async (values, { createPin, coordinates, mapId }: CreatePinModalProps) => {
    await createPin({
      variables: { ...values, id: mapId, latitude: coordinates.lat, longitude: coordinates.lng },
      refetchQueries: [{ query: mapQuery, variables: { id: mapId } }]
    })
  }
})(CreatePinModal);

export default graphql<{
  coordinates: object;
  mapId?: string;
  onClose: () => void;
}>(createPinMutation, { name: 'createPin' })(CreatePinFormModal);
