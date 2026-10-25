import React from 'react';
import clsx from 'clsx';
import ThemedImage from '@theme/ThemedImage';

import { Image } from '@site/src/types';

import styles from './styles.module.css';

interface Props {
  title?: string;
  tagline?: string;
  image?: Image;
  children: React.ReactNode;
}

export default function Hero(props: Props): React.JSX.Element {
  const { title, tagline, image, children } = props;

  if (typeof title === 'undefined' && typeof image === 'undefined') {
    throw new Error('one of `title` or `image` must be defined');
  }

  return (
    <header className={clsx('hero', styles.hero)}>
      <div className={styles.hero__left}>
        <img src="/img/index/mint-bolts.svg" alt="" />
      </div>
      <div className={styles.hero__container}>
        {title &&
          <p className={styles.hero__subtitle}>{title}</p>
        }
        {image &&
          <span className={styles.hero__image}>
            <ThemedImage
              alt={image.alt}
              sources={{ light: image.src, dark: image.srcDark ?? image.src }} />
          </span>
        }
        {tagline &&
          <p className={styles.hero__subtitle}>{tagline}</p>
        }
        {children}
      </div>
      <div className={styles.hero__right}>
        <img src="/img/index/raspberry-bolts.svg" alt="" />
      </div>
    </header>
  );
}
