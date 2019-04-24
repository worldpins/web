import * as React from 'react';
import { Form, FieldArray } from 'hooked-form';
import { withRouter, RouteComponentProps } from 'react-router';
import { graphql, compose } from 'react-apollo';

import Modal from '../../../common/modal';

import TemplatePins from './TemplatePins';
import {
  createTemplatePin as createTemplatePinMutation,
  updateTemplatePin as updateTemplatePinMutation,
} from './_mutations.gql';

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
  updateTemplatePin: (
    input: {
      variables: {
        mapId: string;
        id: string;
        name: string;
        comment: string;
        fields: object[];
      };
    },
  ) => Promise<void>;
}

const ManageTemplatesModal: React.FC<Props> = ({ history, handleSubmit }) => {
  const onClose = React.useCallback(() => history.replace('/maps'), []);

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="templates"
      onSubmit={handleSubmit}
      buttons={React.useMemo(
        () => [
          { label: 'Close', flavor: 'danger', onClick: onClose },
          { label: 'Submit', flavor: 'primary', onClick: handleSubmit },
        ],
        [onClose, handleSubmit],
      )}
    >
      <FieldArray fieldId="templatePins" component={TemplatePins} />
    </Modal>
  );
};

interface Field {
  name: string;
}

interface Template {
  comment: string;
  fields: Field[];
  id?: string;
  name: string;
}

interface Values {
  templatePins: Template[];
}

interface TempTemplate {
  comment: string;
  fields: string[];
  id?: string;
  name: string;
}

const ManageTemplatesFormModal = Form({
  mapPropsToValues: (props: Props) => {
    let templatePins;
    if (props.templatePins) {
      templatePins = props.templatePins.reduce(
        (acc: object[], template: TempTemplate) => {
          const item = {
            ...template,
            fields: template.fields.map((x: string) => ({ name: x })),
          };
          return [...acc, item];
        },
        []);
    }
    return { templatePins: templatePins || [] };
  },
  onSubmit: async (values: Values, { createTemplatePin, updateTemplatePin, id: mapid }: Props) => {
    for (const newTemplate of values.templatePins) {
      if (newTemplate.id) {
        await updateTemplatePin({
          variables: {
            comment: newTemplate.comment,
            fields: newTemplate.fields,
            id: newTemplate.id,
            mapId: mapid,
            name: newTemplate.name,
          },
        });
      } else {
        await createTemplatePin({
          variables: {
            comment: newTemplate.comment,
            fields: newTemplate.fields,
            id: mapid,
            name: newTemplate.name,
          },
        });
      }
    }
  },
})(React.memo(ManageTemplatesModal));

interface InputProps {
  id?: string;
  templatePins: Template[];
}

export default withRouter<InputProps & RouteComponentProps>(
  compose(
    graphql<{ id?: string; templatePins: object[] }>(createTemplatePinMutation, {
      name: 'createTemplatePin',
    }),
    graphql<{ id?: string; templatePins: object[] }>(updateTemplatePinMutation, {
      name: 'updateTemplatePin',
    }),
  )(ManageTemplatesFormModal),
);
