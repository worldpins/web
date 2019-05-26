import * as React from 'react';
import ReactModal from 'react-modal';

import styled from '../../layout/styled';
import Cross from './cross';
import Button, { ButtonProps } from '../button';
import useLockBodyScroll from './useLockBodyScroll';

// Needed for screen readers.
ReactModal.setAppElement('body');

interface ModalProps {
  buttons?: ButtonProps[];
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
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
  overflow: hidden;
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

// TODO: Refactor to withComponent
const ModalWrapper = styled.div`
  box-shadow: 0em 1px 2px 0px rgba(0, 0, 0, 0.25);
  height: 100%;
  overflow: hidden;
`;

const FormModalWrapper = styled.form`
  box-shadow: 0em 1px 2px 0px rgba(0, 0, 0, 0.25);
  height: 100%;
  overflow: hidden;
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
  > * {
    margin-left: 8px;
  }
`;

// TODO: overflow
const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  className,
  isOpen,
  buttons = [],
  onSubmit,
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

  useLockBodyScroll();

  let Wrapper: any = ModalWrapper;
  if (onSubmit) {
    Wrapper = FormModalWrapper;
  }

  return (
    <ReactModal
      className={contentClassName}
      isOpen={isOpen}
      overlayClassName={overlayClassName}
      portalClassName={className}
      onRequestClose={memoizedOnClose}
    >
      <Wrapper onSubmit={onSubmit}>
        <Header>
          <Title>{title}</Title>
          <Cross onClick={onClose} />
        </Header>
        <Body>{children}</Body>
        <Footer>
          {buttons.map((props, i) => <Button key={i} {...props} />)}
        </Footer>
      </Wrapper>
    </ReactModal>
  );
};

// @ts-ignore
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
    background-color: rgba(0, 0, 0, 0.8);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
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
    z-index: 999;
  }
`;
