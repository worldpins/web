import * as React from 'react';
import ReactModal, { defaultStyles } from 'react-modal';

import styled from '../../layout/styled';

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
}

const Header = styled.div`
  display: 'flex';
`;

const Footer = styled.div`
  display: 'flex';
`;

const Modal: React.SFC<ModalProps> = ({ children, className, isOpen }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={defaultStyles}
    >
      <Header></Header>
      <body>{children}</body>
      <Footer></Footer>
    </ReactModal>
  );
}

export default Modal;