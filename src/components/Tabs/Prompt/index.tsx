import React from 'react';
import Copy from '@site/src/components/Copy';

import styles from './styles.module.css';

export declare interface Props {
  text: string;
}

export default function Prompt({ text }: Props):JSX.Element {
  return (
    <div className={styles.prompt}>
      <pre className={styles.language}>
        <code>{text}</code>
      </pre>
      <div className={styles.buttonGroup}>
        <Copy text={text} />
      </div>
    </div>
  );
}
