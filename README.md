scv
===

A SPARQL-driven vocabulary viewer

_**NOTE: preliminary**_


### Setup 

```shell
$ npm install 
$ bower install 
```

See configuration examples under `config/`.

Example of setting up a browser for a particular vocabulary:

```shell
$ gulp --config  ./config/ooi_epe_science.js
```

Then open `app/index.html` in your browser. Using a local http server to serve 
this directory, for example, with [http-server](https://github.com/nodeapps/http-server):

```shell
$ http-server
Starting up http-server, serving ./ on port: 8080
Hit CTRL-C to stop the server
```

open [http://localhost:8080/app/](http://localhost:8080/app/)


Some examples deployed:

- http://mmisw.org/experimental/vrowser/ioos_param/
- http://mmisw.org/experimental/vrowser/ooi_epe_science/
- http://mmisw.org/experimental/vrowser/cf/

