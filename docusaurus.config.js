// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const config = {
  title: 'TreePPL',
  tagline: 'A Universal Probabilistic Programming Language for Phylogenetics and Evolutionary Biology',
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
          path: 'docs', // Main documentation
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs', // This makes docs appear at /docs/
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'getting-started',
        path: 'getting-started',
        routeBasePath: 'getting-started',
        sidebarPath: require.resolve('./sidebarsGettingStarted.js'),
        // ... other options
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
            to: '/getting-started/getting-started',
            position: 'left',
            label: 'Getting Started',
            activeBaseRegex: `/getting-started/`
          },

          {
            type: 'doc',
            docId: 'docs',
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
      algolia: {
        // The application ID provided by Algolia
        appId: 'GMDMVF6JJU',
  
        // Public API key: it is safe to commit it
        apiKey: '893a4c3bf8a2be3d557fca8a80ab4471',
  
        indexName: 'treeppl',
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
  
        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,
  
        //... other Algolia params
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
        This project was in part financially supported by the Swedish Foundation for Strategic Research (FFL15–0032 and <br>
        RIT15–0012), by Digital Futures and by the Swedish Research Council (grant 2018–04329 awarded to DB, grants <br>
        2018-04620 and 2021–04830 awarded to FR, and International Postdoc Grant 2020–06422 awarded to MPB), and by the <br> 
        European Union’s Horizon 2020 research and innovation program under the Marie Skłodowska–Curie grant agreement <br>
        PhyPPL No. 898120 to V.S. The research has also partially been carried out as part of the Vinnova Competence Center <br>
        for Trustworthy Edge Computing Systems and Applications at KTH Royal Institute of Technology. This work was also <br>
        partially supported by the Wallenberg AI, Autonomous Systems and Software Program (WASP) funded by the Knut <br>
        and Alice Wallenberg Foundation. As of 2025, the work is also supported by the project DarkTree, funded by <br> 
        the Knut and Alice Wallenberg Foundation.<br>
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
