import * as React from "react";
import { Form, FieldArray } from "hooked-form";
import { withRouter } from "react-router";
import { graphql } from "react-apollo";

import Modal from "../../../common/modal";

import TemplatePins from "./TemplatePins";
import { createTemplatePinMutation } from "./_mutations";

interface Props {
  createTemplatePin: (
    input: {
      variables: {
        id: string;
        name: string;
        comment: string;
        fields: Array<object>;
      };
    }
  ) => Promise<void>;
  handleSubmit: () => void;
  history: {
    replace: (path: string) => void;
  };
  id: string;
  templatePins: Array<object>;
}

const ManageTemplatesModal: React.FC<Props> = ({ history, handleSubmit }) => {
  const onClose = React.useCallback(() => history.replace("/maps"), []);
  return (
    <Modal
      isOpen
      onClose={onClose}
      title="templates"
      buttons={[
        { label: "Close", flavor: "danger", onClick: onClose },
        { label: "Submit", flavor: "primary", onClick: handleSubmit }
      ]}
    >
      <form onSubmit={handleSubmit}>
        <FieldArray fieldId="templatePins" component={TemplatePins} />
      </form>
    </Modal>
  );
};

const ManageTemplatesFormModal = withRouter(
  Form({
    mapPropsToValues: props => {
      console.log(props);
      return { templatePins: (props as any).templatePins };
    },
    onSubmit: async (values: any, { createTemplatePin, id }: Props) => {
      const newTemplate = values.templatePins[0];
      console.log("submitting", values, newTemplate);
      await createTemplatePin({
        variables: {
          id,
          fields: newTemplate.fields,
          comment: newTemplate.comment,
          name: newTemplate.name
        }
      });
    }
  })(ManageTemplatesModal)
);

export default graphql(createTemplatePinMutation, {
  name: "createTemplatePin"
})(ManageTemplatesFormModal);
