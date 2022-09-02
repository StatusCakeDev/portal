/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
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
        'api/authentication',
        'api/ratelimiting',
        'api/errors',
        'api/parameters',
      ],
    },
    {
      type: 'category',
      label: 'SDKs',
      items: [
        'sdks/introduction',
        'sdks/installation',
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
      ],
    },
    {
      type: 'category',
      label: 'Terraform',
      items: [
        'terraform/introduction',
      ],
    },
  ],
};

module.exports = sidebars;
