import React from 'react';
import clsx from 'clsx';
import Image, { Props as Attributes } from '@site/src/components/Image';

import styles from './styles.module.css';

interface Props {
  title?: string;
  tagline?: string;
  image?: Attributes;
  children: React.ReactNode;
}

export default function Hero(props: Props): JSX.Element {
  const { title, tagline, image, children } = props;

  if (typeof title === 'undefined' && typeof image === 'undefined') {
    throw new Error('both `title` and `tag` cannot be undefined');
  }

  return (
    <header className={clsx('hero', styles.hero)}>
      <div className={styles.hero__left}>
        <img src="/img/index/mint-bolts.svg" />
      </div>
      <div className={styles.hero__container}>
        {title &&
          <p className={styles.hero__subtitle}>{title}</p>
        }
        {image &&
          <span className={styles.hero__image}>
            <Image src={image.src} srcDark={image.srcDark} alt={image.alt} />
          </span>
        }
        {tagline &&
          <p className={styles.hero__subtitle}>{tagline}</p>
        }
        {children}
      </div>
      <div className={styles.hero__right}>
        <img src="/img/index/raspberry-bolts.svg" />
      </div>
    </header>
  );
}
