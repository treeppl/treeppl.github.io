# TreePPL Website

This repository contains the source code for the TreePPL website [https://treeppl.org](https://treeppl.org).

The `master` branch contains the source code for the official TreePPL website. The website is deployed through the `gh-pages` branch. Hence, we should only commit changes to the `master`branch.

The website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

Install [Node.js](https://nodejs.org/en/) on your computer.

Run command

```
npm install
```

to install all dependent packages (including the Docusaurus libraries).

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Use
```
$ npm run deploy
```
to deploy to the `gh-pages` branch. If the command fails and asks you to set the `GIT_USER` environment variable, try running
```
$ USE_SSH=true npm run deploy
```
instead. You can also set the `GIT_USER` variable if you want to use HTTPS to deploy. In such a case, run
```
$ GIT_USER=user_name npm run deploy
```
where `user_name` is your Github user name.

More information can be found [here](https://docusaurus.io/docs/deployment#deploying-to-github-pages).

