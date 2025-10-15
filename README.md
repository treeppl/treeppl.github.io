# TreePPL Website

This repository contains the source code for the TreePPL website [https://treeppl.org](https://treeppl.org).

The website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

The `master` branch contains the source code for the official TreePPL website. The website is deployed through the `gh-pages` branch. Changes to the web site are committed by the TreePPL team to the `master` branch.

## How to contribute

If you would like to contribute to the TreePPL web site, first create a fork of this repository. Then follow the instructions below.

### Installation

To work on the web site you need to have Node.js and npm installed on your computer.

First install Node.js using the instructions at their web site: [Node.js](https://nodejs.org/en/).

Then run command

```
$ npm install
```

to install all dependent packages (including the Docusaurus libraries).

### Local Development

Switch to the directory with your local fork of the TreePPL web site repository. Then issue the following command:

```
$ npm run start
```

This command starts a local development server and opens up a browser window. This will lock up your terminal so you will have to start a new terminal to access the source files.

Now you can introduce the changes you would like to see in the web site by modifying source files. Most changes are reflected live without having to restart the server. If you need to restart the web server, switch to the terminal from which you started the web server, press ctrl-C and rerun

```
$ npm run start
```

When you are done, post a pull request to the TreePPL web site repository (this repository).


## Deploying the web site

If you wanted to build the web site yourself, you would use the following steps. However, these steps are run automatically by GitHub actions for the official web site when a pull request is merged. 

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

