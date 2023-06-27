// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'StatusCake Developers Portal',
  tagline: 'Build comprehensive website monitoring suites using the tools and languages you love.',
  url: 'https://developers.statuscake.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  organizationName: 'StatusCakeDev',
  projectName: 'portal',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  /** @type {import('@site/src/types').CustomFields} */
  customFields: {
    hero: {
      image: {
        src: '/img/index/logo-dev.svg',
        srcDark: '/img/index/logo-dev-dark.svg',
        alt: 'StatusCake Developers Portal',
      },
    },
    clients: [{
      title: 'Go',
      prompt: 'go get github.com/StatusCakeDev/statuscake-go',
      href: 'https://github.com/StatusCakeDev/statuscake-go',
      image: {
        src: '/img/languages/go.svg',
        alt: 'Go',
      },
    }, {
      title: 'JavaScript',
      prompt: 'npm install -D statuscake-js',
      href: 'https://github.com/StatusCakeDev/statuscake-js',
      image: {
        src: '/img/languages/node.svg',
        alt: 'JavaScript',
      },
    }, {
      title: 'Python',
      prompt: 'pip install statuscake-py',
      href: 'https://github.com/StatusCakeDev/statuscake-py',
      image: {
        src: '/img/languages/python.svg',
        alt: 'Python',
      },
    }, {
      title: 'Ruby',
      prompt: 'bundle add statuscake-rb',
      href: 'https://github.com/StatusCakeDev/statuscake-rb',
      image: {
        src: '/img/languages/ruby.svg',
        alt: 'Ruby',
      },
    }],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: false,
        docs: {
          path: 'guides',
          routeBasePath: 'guides',
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
          showLastUpdateTime: true,
          editUrl: 'https://github.com/StatusCakeDev/portal/edit/master/',
        },
        gtag: {
          trackingID: 'G-Q1H0RXRCRD',
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    [
      'redocusaurus',
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: 'src/spec/openapi.yaml',
            route: '/api/',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#1890ff',
          options: {
            disableSearch: true,
            expandResponses: '200',
            hideFab: true,
            hideLoading: true,
            hideSingleRequestSampleTab: true,
            nativeScrollbars: true,
          },
          theme: {
            // https://github.com/Redocly/redoc#redoc-theme-object
          },
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: '164WA72IY0',
        apiKey: 'f1d6dae27a5ebf65d6eca2de77ea4d22',
        indexName: 'statuscake',
      },
      announcementBar: {
        id: 'survey',
        content: 'We are looking to improve our docs, please fill <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSf6YdcflYefzuAswHs9VpSj29VQH1a7vqEnD6I9vmI47dwH5Q/viewform?usp=sf_link">this survey</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} StatusCake. Built with <a target="_blank" rel="noopener noreferer" href="https://docusaurus.io/">Docusaurus</a> and <a target="_blank" rel="noopener noreferrer" href="https://redocly.com/redoc/">Redocly</a>.`,
        links: [
          { title: 'Documentation', items: [
            { label: 'Guides', to: '/guides' },
          ]},
          { title: 'Community', items: [
            { href: 'https://github.com/StatusCakeDev', label: 'GitHub' },
            { href: 'https://stackoverflow.com/questions/tagged/statuscake', label: 'Stack Overflow' },
            { href: 'https://www.linkedin.com/company/statuscake/', label: 'LinkedIn' },
            { href: 'https://twitter.com/statuscaketeam', label: 'Twitter' },
          ]},
          { title: 'More', items: [
            { href: 'https://www.statuscake.com/blog', label: 'Blog' },
            { href: 'https://www.statuscake.com/join-the-team/', label: 'Careers', position: 'left' },
          ]},
        ],
      },
      navbar: {
        hideOnScroll: false,
        items: [
          { to: '/guides', label: 'Guides', position: 'left' },
          { to: '/api', label: 'References', position: 'left' },
          { to: 'https://app.statuscake.com', label: 'Dashboard', position: 'right' },
          { href: 'https://github.com/StatusCakeDev', className: 'icon github', 'aria-label': 'GitHub', position: 'right' },
        ],
        logo: {
          alt: 'StatusCake Developers Portal',
          src: '/img/logo.svg',
          srcDark: '/img/logo-dark.svg',
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['hcl', 'ruby'],
      },
    }),
};

module.exports = config;
