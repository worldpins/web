import * as React from 'react';
import { Form, Field } from 'hooked-form';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

import Modal from '../../../common/modal';
import StringField from '../../../common/fields/stringField';
import SelectField from '../../../common/fields/selectField';

import { createMapMutation } from './_mutations';

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
      buttons={[
        { label: "Submit", type: "submit", flavor: 'primary' },
        { label: "Close", type: "button", onClick: onClose, flavor: 'danger' }
      ]}
    >
      <form onSubmit={handleSubmit}>
        <Field
          component={StringField}
          fieldId="name"
          label="name"
          placeholder="Name"
        />
      </form>
    </Modal>
  );
}

const CreateMapFormModal = withRouter(
  Form({
    onSubmit: async (values, { createMap, history }: { createMap: Function }) => {
      await createMap({ variables: values });
      history.replace('/maps');
    }
  })(CreateMapModal)
);

export default graphql(createMapMutation, {
  name: 'createMap',
})(CreateMapFormModal);
