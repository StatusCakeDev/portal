import React from 'react';
import clsx from 'clsx';
import { Props as Attributes } from '@site/src/components/Image';

import styles from './styles.module.css';

export declare type Props = {
  idx: number;
  isActive: boolean;
  title: string;
  image?: Attributes;
  selected(): void;
}

export default function Tab(props: Props): JSX.Element {
  const { idx, isActive, title, image, selected } = props;

  return (
    <li
        role="tab"
        tabIndex={idx}
        aria-selected={isActive}
        className={clsx('tab', styles.tab, { [styles.active] : isActive })}
        onClick={selected}>
      <div className={styles.tabImage}>
        <img src={image.src} alt={image.alt} />
      </div>
      <div className={styles.tabTitle}>{title}</div>
    </li>
  );
}
