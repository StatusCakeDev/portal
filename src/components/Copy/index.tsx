import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

export declare interface Props {
  text: string;
  onCopy?(): void;
}

export function useCopy(text: string): [() => void, boolean, (value: boolean) => void] {
  const copyableText = useRef(text);
  const [copied, setCopied] = useState(false);

  const copyAction = useCallback(() => {
    navigator.clipboard.writeText(copyableText.current);
    setCopied(true);
  }, [copyableText]);

  useEffect(() => {
    copyableText.current = text;
  }, [text]);

  return [copyAction, copied, setCopied];
}

export default function Copy({ text, onCopy }: Props): JSX.Element {
  const [copy, copied, setCopied] = useCopy(text);

  const copyText = () => {
    copy();

    if (typeof onCopy === 'function') {
      onCopy();
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
        type="button"
        aria-label={copied ? 'Copied' : 'Copy code to clipboard'}
        title="Copy"
        className={clsx(styles.button, { [styles.copied] : copied })}
        onClick={copyText}>
      <span className={styles.icons} aria-hidden="true">
        <svg className={styles.copyButtonIcon} viewBox="0 0 24 24">
          <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path>
        </svg>
        <svg className={styles.copyButtonSuccessIcon} viewBox="0 0 24 24">
          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
        </svg>
      </span>
    </button>
  );
}
