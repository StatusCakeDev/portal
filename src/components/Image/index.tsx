import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export declare type Props = {
  src: string;
  srcDark?: string;
  alt: string;
}

export default function Image({ src, srcDark, alt}: Props): JSX.Element {
  const { colorMode } = useColorMode()

  return (
    <img src={colorMode === 'dark' && srcDark ? srcDark : src} alt={alt} />
  );
}
