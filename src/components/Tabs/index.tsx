import React, { useState } from 'react';
import clsx from 'clsx';
import Tab from '@site/src/components/Tabs/Tab';
import Prompt from '@site/src/components/Tabs/Prompt';
import { Props as Attributes } from '@site/src/components/Image';

import styles from './styles.module.css';

export declare interface Tab {
  title: string;
  prompt: string;
  image: Attributes;
}

export declare interface Props {
  tabs: Array<Tab>;
  onSelected?(idx: number): void;
}

export default function Tabs({ tabs, onSelected }: Props): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const handleSelection = (idx: number): void => {
    setSelected(idx);

    if (typeof onSelected === 'function') {
      onSelected(idx);
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.tabs}>
        {tabs.map((tab, i) => (
          <Tab
            isActive={selected === i}
            title={tab.title}
            image={tab.image}
            selected={() => handleSelection(i)}
            idx={i}
            key={i} />
        ))}
      </ul>
      <Prompt text={tabs[selected].prompt} />
    </div>
  );
}
