import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap'
import styles from './styles.module.css';

interface MainContainerProps {
  children: ReactNode;
}

export default function MainContainer({children}: MainContainerProps) {

  return (
    <Container>
      {children}
    </Container>
  );
}
