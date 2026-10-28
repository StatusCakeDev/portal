import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DocCardList from '@theme/DocCardList';

import { CustomFields } from '@site/src/types';

/**
 * Lists the SDKs configured in `customFields.clients` as documentation cards.
 */
export default function DocClients(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { clients } = siteConfig.customFields as CustomFields;

  return (
    <DocCardList
      items={clients.map((client) => ({
        type: 'link',
        label: client.title,
        href: client.href,
      }))} />
  );
}
