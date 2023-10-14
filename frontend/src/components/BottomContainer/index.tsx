import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap'
import styles from './styles.module.css'

interface BottomContainerProps {
  children: ReactNode;
}

export default function BottomContainer({children}: BottomContainerProps) {

  return (
    <Container className={styles.bottomContainer}>
      {children}
    </Container>
  );
}
