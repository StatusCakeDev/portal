import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

export declare interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: Props): JSX.Element {
  return (
    <div className={clsx('card', styles.card)}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
