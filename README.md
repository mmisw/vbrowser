vbrowser
========

A SPARQL-driven vocabulary browser

_**NOTE: preliminary**_


### Setup 

```shell
$ npm install 
$ bower install 
```

See configuration examples under `config/`.

Example of setting up a browser for a particular vocabulary:

```shell
$ gulp --config  ./config/ioos_param.js
```

Then open `app/index.html` in your browser. Using a local http server to serve 
this directory, for example, with [http-server](https://github.com/nodeapps/http-server):

```shell
$ http-server
Starting up http-server, serving ./ on port: 8080
Hit CTRL-C to stop the server
```

open [http://localhost:8080/app/](http://localhost:8080/app/)

### Generating archive for deployment

Example of generating a distribution for deployment:

```shell
$ gulp dist --config  ./config/ioos_param.js
```

Then copy and expand `dist/vbrowser-ioos_param.zip` on target location.


Some examples deployed:

- https://mmisw.org/experimental/vbrowser/ioos_param/
- https://mmisw.org/experimental/vbrowser/ooi_epe_science/
- https://mmisw.org/experimental/vbrowser/cfsn/
- https://mmisw.org/experimental/vbrowser/cfat/

