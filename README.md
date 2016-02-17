# Blue Pencil
Blue Pencil allows you to collaboratively manage data that's stored on Github through a simple form. These forms are public and editing suggestions can be made anonymously. The approval process is fully handled through Pull Requests and is restricted to those with write access to the project.

To set this up, you need to run three projects:

1. This repo contains the client side app that serves the form
2. [Blue Pencil server](https://github.com/developmentseed/blue-pencil-server) creates the Pull Requests and handles authentication with Github
3. [Blue Pencil data](https://github.com/developmentseed/blue-pencil-example-data) is the repo where example data and form configuration is stored.

This project is under active development. To get a sense of the roadmap or contribute, please use the [issue queue](https://github.com/developmentseed/blue-pencil/issues).

## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- Node (v4.2.x) & Npm ([nvm](https://github.com/creationix/nvm) usage is advised)

> The versions mentioned are the ones used during development. It could work with newer ones.
  Run `nvm use` to activate the correct version.

After these basic requirements are met, run the following commands in the website's folder:
```
$ npm install
```

### Server
This app requires communication with a server which can be found in the [blue-pencil-server](https://github.com/developmentseed/blue-pencil-server) repo.
After running a local copy add the address to `config/production.js`:
```
  api: 'http://localhost:[port]'
```

### Getting started

```
$ npm run serve
```
or
```
$ gulp serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

### Other commands
Compile the sass files, javascript... Use this instead of ```gulp serve``` if you don't want to watch.
```
$ npm run build
```
or
```
$ gulp
```