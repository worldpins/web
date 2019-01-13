import * as React from 'react';

interface Props {
  id: string;
  onClose: () => void;
}

const UpdatePinModal: React.SFC<Props> = () => (
  <div>
    <p>Update pin!</p>
  </div>
);

export default UpdatePinModal;
