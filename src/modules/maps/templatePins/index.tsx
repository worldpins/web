import * as React from 'react';
import { Form, FieldArray } from 'hooked-form';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';

import Modal from '../../../common/modal';

import TemplatePins from './TemplatePins';
import { createTemplatePinMutation } from './_mutations';

interface Props {
  createTemplatePin: (
    input: {
      variables: {
        id: string;
        name: string;
        comment: string;
        fields: object[];
      };
    },
  ) => Promise<void>;
  handleSubmit: () => void;
  history: {
    replace: (path: string) => void;
  };
  id: string;
  templatePins: object[];
}

const ManageTemplatesModal: React.FC<Props> = ({ history, handleSubmit }) => {
  const onClose = React.useCallback(() => history.replace('/maps'), []);
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="templates"
      buttons={[
        { label: 'Close', flavor: 'danger', onClick: onClose },
        { label: 'Submit', flavor: 'primary', onClick: handleSubmit },
      ]}
    >
      <form onSubmit={handleSubmit}>
        <FieldArray fieldId="templatePins" component={TemplatePins} />
      </form>
    </Modal>
  );
};

const ManageTemplatesFormModal = Form({
  mapPropsToValues: (props) => {
    return { templatePins: (props as any).templatePins };
  },
  onSubmit: async (values: any, { createTemplatePin, id }: Props) => {
    const newTemplate = values.templatePins[0];
    console.log('submitting', values, newTemplate);
    await createTemplatePin({
      variables: {
        comment: newTemplate.comment,
        fields: newTemplate.fields,
        id,
        name: newTemplate.name,
      },
    });
  },
})(ManageTemplatesModal);

export default withRouter(
  graphql<{ id?: string; templatePins: object[] }>(createTemplatePinMutation, {
    name: 'createTemplatePin',
  })(ManageTemplatesFormModal),
);
