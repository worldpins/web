import * as React from 'react';
import ReactModal from 'react-modal';

import styled from '../../layout/styled';
import Cross from './cross';
import { ButtonProps } from '../button';

interface ModalProps {
  buttons?: [ButtonProps];
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Title = styled.h1`
  color: ${({ theme }) => theme.secondary};
  display: inline;
  font-size: 1.125em;
  font-weight: normal;
  letter-spacing: 0.5;
`;

const Body = styled.div`
  background-color: white;
  padding-bottom: 1em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-top: 1em;
  width: 100%;
`;

const Header = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.grey};
  border-bottom: 1px solid ${({ theme }) => theme.greyAccent};
  display: flex;
  height: 3.125em;
  justify-content: space-between;
  padding-bottom: 0.813em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-top: 0.938em;
`;

const Wrapper = styled.div`
  box-shadow: 0em 1px 2px 0px rgba(0, 0, 0, 0.25);
  height: 100%;
`;

const Footer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.grey};
  border-top: 1px solid ${({ theme }) => theme.greyAccent};
  display: flex;
  justify-content: flex-end;
  padding-bottom: 16px;
  padding-right: 32px;
  padding-left: 32px;
  padding-top: 16px;
`;

const Modal: React.SFC<ModalProps> = ({
  title, onClose, children, className, isOpen,
}) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  const memoizedOnClose = React.useCallback(
    (e: Event) => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );
  return (
    <ReactModal
      className={contentClassName}
      isOpen={isOpen}
      overlayClassName={overlayClassName}
      portalClassName={className}
      onRequestClose={memoizedOnClose}
    >
      <Wrapper>
        <Header>
          <Title>{title}</Title>
          <Cross onClick={onClose} />
        </Header>
        <Body>
          {children}
        </Body>
        <Footer></Footer>
      </Wrapper>
    </ReactModal>
  );
}

export default styled(Modal)`
  .ReactModal__Overlay {
    transition: opacity 300ms ease-in-out;
    opacity: 0;

    &--after-open {
      opacity: 1;
    }

    &--before-close {
      opacity: 0;
    }
  }

  &__overlay {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.80);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
  }

  &__content {
    background-color: white;
    border: none;
    border-radius: 0;
    bottom: auto;
    font-weight: normal;
    left: 0;
    max-width: 700px;
    min-width: 450px;
    outline: 0;
    overflow: visible;
    padding: 0;
    position: relative;
    right: 0;
    top: 0;
    width: 100%;
  }
`;
