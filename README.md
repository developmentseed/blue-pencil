# BLue Pencil

[Blue Pencil Description]

## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- [Node and npm](http://nodejs.org/)
- Gulp ( $ npm install -g gulp )

After these basic requirements are met, run the following commands in the website's folder:
```
$ npm install
```

### Server (TEMPORARY)
This app requires communication with a server which can be found in the [blue-pencil-server](https://github.com/developmentseed/blue-pencil-server) repo.
After running a local copy add the address to `config/local.js`:
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