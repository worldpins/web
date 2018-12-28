import * as React from 'react';
import { Form, Field } from 'hooked-form';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

import Modal from '../../../common/modal';
import StringField from '../../../common/fields/stringField';

import { createMapMutation } from './_mutations';
import Button from '../../../common/button';

interface CreateMapModalProps {
  handleSubmit: () => void;
  history: {
    push: (path: string) => void;
  };
}

const CreateMapModal: React.SFC<CreateMapModalProps> = ({ handleSubmit, history }) => {
  const onClose = React.useCallback(() => history.push('/maps'), []);
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Create Map"
    >
      <form onSubmit={handleSubmit}>
        <Field
          component={StringField}
          fieldId="name"
          label="name"
          placeholder="Name"
        />
        <Button type="submit" label="Save" />
      </form>
    </Modal>
  );
}

const CreateMapFormModal = withRouter(
  Form({
    onSubmit: async (values, { createMap }: { createMap: Function }) => {
      await createMap({ variables: values });
    }
  })(CreateMapModal)
);

export default graphql(createMapMutation, {
  name: 'createMap',
})(CreateMapFormModal);
