import * as React from 'react';
import { Form } from 'hooked-form';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

import Modal from '../../../common/modal';

import { createMapMutation } from './_mutations';

const CreateMapModal = () => (
  <Modal isOpen>
    <form>

    </form>
  </Modal>
);

const CreateMapFormModal = withRouter(
  Form({
    onSubmit: async (values, { createMap }) => {
      await createMap(values);
    }
  })(CreateMapModal)
);

export default graphql(createMapMutation, {
  name: 'createMap',
})(CreateMapFormModal);
