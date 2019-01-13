import * as React from 'react';
import { Form, FieldArray } from 'hooked-form';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';

import Modal from '../../../common/modal';
import Button from '../../../common/button';

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

const ManageTemplatesModal: React.SFC<Props> = ({ history, handleSubmit }) => (
  <Modal
    isOpen
    onClose={() => React.useCallback(() => history.replace('/maps'), [])}
    title="templates"
  >
    <form onSubmit={handleSubmit}>
      <FieldArray fieldId="templatePins" component={TemplatePin} />
      <Button type="submit" label="Submit" />
    </form>
  </Modal>
);

const ManageTemplatesFormModal = withRouter(Form({
  mapPropsToValues: props => {
    console.log(props);
    return { templatePins: (props as any).templatePins }
  },
  onSubmit: async (values: any, { createTemplatePin, id }: Props) => {
    const newTemplate = values.templatePins[0];
    console.log('submitting', values, newTemplate);
    await createTemplatePin({
      variables: {
        id,
        fields: newTemplate.fields,
        comment: newTemplate.comment,
        name: newTemplate.name,
      }
    })
  }
})(ManageTemplatesModal));

export default graphql(
  createTemplatePinMutation, { name: 'createTemplatePin' },
)(ManageTemplatesFormModal);
