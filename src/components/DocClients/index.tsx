import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DocCard from '@theme/DocCard';
import Cards from '@site/src/components/Cards';

import { Client } from '@site/src/types';

export default function DocClients(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const clients = siteConfig.customFields.clients as Array<Client>;
  return (
    <Cards>
      {clients.map((client) => (
        <DocCard
          item={{ type: 'link', label: client.title, href: client.href }}
          key={client.title} />
      ))}
    </Cards>
  );
}
