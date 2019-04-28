import * as React from 'react';
import { Form, Field } from 'hooked-form';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

import Modal from '../../../common/modal';
import StringField from '../../../common/fields/stringField';

import { createMap as createMapMutation } from './_mutations.gql';

interface CreateMapModalProps {
  handleSubmit: () => void;
  history: {
    push: (path: string) => void;
  };
  match: {
    params: {
      mapId?: string;
    },
  };
}

const CreateMapModal: React.SFC<CreateMapModalProps> = ({
  handleSubmit, history, match: { params: { mapId: selectedMap } },
}) => {
  const onClose = React.useCallback(
    () => history.push(`/maps${selectedMap ? `/${selectedMap}` : ''}`),
    []);

  const buttons = React.useMemo(
    () => [
      { label: 'Close', type: 'button', onClick: close, flavor: 'danger' },
      { label: 'Submit', type: 'submit', flavor: 'primary' },
    ],
    [close]);

  return (
    <Modal
      isOpen
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Create Map"
      buttons={buttons}
    >
      <Field
        component={StringField}
        fieldId="name"
        label="name"
        placeholder="Name"
      />
    </Modal>
  );
};

const CreateMapFormModal = withRouter(
  Form({
    onSubmit: async (values, { createMap, history }:
      { createMap: Function, history: { replace: (path: string) => void },
    }) => {
      const { data } = await createMap({ variables: values });
      const { id } = data.createMap;
      history.replace(`/maps/${id}`);
    },
  })(CreateMapModal),
);

export default graphql(createMapMutation, { name: 'createMap' })(CreateMapFormModal);
