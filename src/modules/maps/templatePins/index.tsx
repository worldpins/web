import * as React from 'react';
import { Form, FieldArray } from 'hooked-form';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';

import Modal from '../../../common/modal';

import TemplatePin from './TemplatePin';
import { createTemplatePinMutation } from './_mutations';

interface Props {
  createTemplatePin: (input: {
    variables: {
      id: string;
      name: string;
      comment: string;
      fields: Array<object>
    }
  }) => Promise<void>;
  history: {
    replace: (path: string) => void;
  }
  id: string;
  templatePins: Array<object>;
}

const ManageTemplatesModal: React.SFC<Props> = ({ history }) => (
  <Modal
    isOpen
    onClose={() => React.useCallback(() => history.replace('/maps'), [])}
    title="templates"
  >
    <FieldArray fieldId="templatePins" component={TemplatePin} />
  </Modal>
);

const ManageTemplatesFormModal = withRouter(Form({
  mapPropsToValues: props => ({ templatePins: (props as any).templatePins }),
  onSubmit: async (values: any, { createTemplatePin, id }: Props) => {
    await createTemplatePin({ variables: {
      id,
      fields: values.fields,
      comment: values.comment,
      name: values.name,
    } })
  }
})(ManageTemplatesModal));

export default graphql(
  createTemplatePinMutation, { name: 'createTemplatePin'},
)(ManageTemplatesFormModal);
