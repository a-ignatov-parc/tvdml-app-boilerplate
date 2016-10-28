# TVDML Application boilerplate

Basic build configuration to begin building Apple TV apps using [TVDML](https://github.com/a-ignatov-parc/tvdml) library.

## Building project

To be able to build application you need to have node.js >= 4.0.0 and npm >= 2.

To install all dependencies use:

```bash
npm install
```

To simplify executing build tasks you can install gulp.js globaly:

```bash
npm install -g gulp
```

Now you can build your application located in `/src` folder with default task using:

```bash
gulp
```

> default task is alias for `gulp build`

To build optimized and minified version use `--production` argument:

```bash
gulp --production
```

To start watcher with auto-builds use:

```bash
gulp watch
```

To start web-server to serve your application use:

```bash
gulp serve
```

> Server will be started at [localhost:9001](http://localhost:9001/)

## Additional information

- Results of build task will be stored in `/out` folder.

- To check all available tasks use:

  ```bash
  gulp --tasks
  ```

- More information on how to use gulp.js can be found [here](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).