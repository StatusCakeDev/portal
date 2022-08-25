import React from 'react';

import styles from './styles.module.css';

export declare interface Props {
  children: React.ReactNode;
}

export default function Cards({ children }: Props): JSX.Element {
  return (
    <div className={styles.cards}>
      {children}
    </div>
  );
}
