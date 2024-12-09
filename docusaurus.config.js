// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const config = {
  title: 'TreePPL',
  tagline: 'A Universal Probabilistic Programming Language Inspired from Phylogenetics',
  url: 'http://treeppl.org/',
  baseUrl: '/',
  projectName: 'treeppl.github.io',
  organizationName: 'treeppl',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',
  // TODO We should eventually fix broken links and throw if any are found
  // onBrokenLinks: 'throw',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],

  themeConfig: {
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'TreePPL',
        // TODO Add TreePPL logo
        // logo: {
        //   alt: 'TreePPL Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'doc',
            docId: 'Howtos/index',
            position: 'left',
            label: 'Installation',
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/treeppl',
            label: 'GitHub',
            position: 'right',
          },
          {
            to: 'devteam',
            position: 'left',
            label: 'Meet the Team',
          },
        ],
      },
      footer: {
        style: 'dark',
        // links: [
        //   {
        //     title: 'Documentation',
        //     items: [
        //       {
        //         label: 'TreePPL',
        //         to: '/docs/treeppl',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Links',
        //     items: [
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/treeppl',
        //       },
        //       {
        //         to: 'devteam',
        //         label: "Meet the Developers",
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="/devteam"> TreePPL Research and Development Team</a> <br>
        Funded by the EU Horizon 2020 Marie Skłodowska-Curie grant agreement PhyPPL No. 898120,<br>
        and by the Swedish Foundation for Strategic Research, as well as Vetenskapsrådet (VR).<br>
        This slide has been designed using images from <a href="https://flaticon.com">Flaticon.com</a><br>
        Built via <a href="https://docusaurus.io">Docusaurus.io</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash']
      },
    },
};

module.exports = config;
