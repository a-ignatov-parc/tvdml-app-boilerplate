# TVDML Application boilerplate

Basic build configuration to begin building Apple TV apps using [TVDML](https://github.com/a-ignatov-parc/tvdml) library.

## Building project

To be able to build application you need `node.js` >= 6.0.0 and `yarn` >= 1.0.0.

> If you are using [nvm](https://github.com/creationix/nvm) there is an `.nvmrc`

To start we need to install all dependencies with `yarn`:

```bash
yarn
```

If you don't have globally installed `yarn` you can install all dependencies using local `yarn` installation:

```bash
npm run install-deps
```

> This command should be used to install deps in CI.

Now you can build your application located in `/src` folder:

```bash
npm run build
```

To build optimized and minified version use:

```bash
npm run dist
```

To start server with autorebuilds:

```bash
npm run serve
```

> Server will be started at [localhost:9001](http://localhost:9001/)

## Additional information

- Results of build task will be stored in `/dist` folder.
- Old build configuration based on `gulp.js` can be found in [`gulp` branch](https://github.com/a-ignatov-parc/tvdml-app-boilerplate/tree/gulp).
