import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { CustomFields } from '@site/src/types';

import styles from './styles.module.css';

/**
 * Shows how to install each SDK, one language per tab. The tab values match
 * those used in the SDK guides, so choosing a language here is remembered
 * there.
 */
export default function ClientTabs(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { clients } = siteConfig.customFields as CustomFields;

  return (
    <div className={styles.container}>
      <Tabs groupId="languages" className={styles.tabs}>
        {clients.map((client) => (
          <TabItem
            key={client.title}
            value={client.title.toLowerCase()}
            label={client.title}
            attributes={{
              className: styles.tab,
              style: { '--tab-icon': `url(${client.image.src})` },
            }}>
            <CodeBlock language="bash">{client.prompt}</CodeBlock>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}
