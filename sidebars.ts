import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  guides: [
    {
      type: 'category',
      label: 'Overview',
      items: [
        'overview/about',
        'overview/examples',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'api/introduction',
        'api/resources',
        'api/authentication',
        'api/pagination',
        'api/parameters',
        'api/ratelimiting',
        'api/errors',
      ],
    },
    {
      type: 'category',
      label: 'SDKs',
      items: [
        'sdks/introduction',
        'sdks/installation',
        'sdks/authentication',
        'sdks/quickstart',
        'sdks/managing-resources',
        'sdks/results',
        'sdks/pagination',
        'sdks/errors',
        'sdks/configuration',
        'sdks/backoff',
        'sdks/alpha',
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      items: [
        'cli/introduction',
        'cli/installation',
        'cli/authentication',
        'cli/configuration',
        'cli/managing-resources',
        'cli/uptime-checks',
        'cli/other-checks',
        'cli/alerting',
        'cli/results',
        'cli/scripting',
        'cli/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Terraform',
      items: [
        'terraform/introduction',
        'terraform/installation',
        'terraform/authentication',
        'terraform/configuration',
        'terraform/quickstart',
        'terraform/uptime-checks',
        'terraform/other-checks',
        'terraform/alerting',
        'terraform/data-sources',
        'terraform/importing',
        'terraform/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'MCP',
      items: [
        'mcp/introduction',
        'mcp/installation',
        'mcp/clients',
        'mcp/tools',
        'mcp/using',
        'mcp/configuration',
        'mcp/security',
        'mcp/troubleshooting',
      ],
    },
  ],
};

export default sidebars;
