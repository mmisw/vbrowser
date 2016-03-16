(function() {
  'use strict';

  angular.module('vbrowser.data', []).factory('dataService', ['$http', 'cfg', function($http, cfg) {
    return {
      getGeneralInfo:   function(fns) { getGeneralInfo($http, cfg, fns); },
      getTermList:      function(fns) { getTermList($http, cfg, fns); },
      getTermDetails:   function(termName, fns) { getTermDetails($http, cfg, termName, fns); },

      getMappings:   function(termUri, queryTemplate, sparqlEndpoint, fns) {
        getMappings($http, termUri, queryTemplate, sparqlEndpoint, fns); },

      cachedTermDict:   function() { return cache.termDict; }
    };
  }]);

  /*
   * cache.termDict: populated individually if first requests are individual terms,
   * and all at once for the full list request.
   * cache.termList: version for the grid widget.
   */
  var cache = {
    generalInfo: undefined,
    termDict: {},
    termList: undefined,
    nercDict: {}
  };

  function logQuery(query, title) {
    console.log("making query: " +(title ? title : '')+
      "\n    " + query.replace(/\n/g, '\n    '));
  }

  /**
   * Customized error handler for an http request.
   * @param cb         callback to report error.
   * @returns {Function}  handler
   */
  function httpErrorHandler(cb) {
    return function(data, status, headers, config) {
      var reqMsg = config.method + " '" + config.url + "'";
      var error = "An error occured with HTTP request: " +reqMsg;
      //error += "<br/> query: " + _.escape(config.params.query).replace(/\n/, '<br/>');
      error += "<br/>Status: " + status;
      cb(error);
    };
  }

  function getGeneralInfo($http, cfg, fns) {
    if (cache.generalInfo) {
      //console.log("generalInfo", cache.generalInfo, "in cache");
      fns.gotGeneralInfo(undefined, cache.generalInfo);
      return;
    }

    var query = doReplacements(cfg.orr.generalInfoQuery, {
      'voc.uri': cfg.voc.uri
    });

    logQuery(query, "general info");

    $http.get(cfg.orr.sparqlEndpoint, {params: {query: query}})
      .success(function (data, status, headers, config) {
        //console.log("getGeneralInfo: data= ", data);
        var names = data.names;
        var rows = data.values;

        if (rows.length == 1) {
          cache.generalInfo = {"orr": {}};
          _.each(names, function(name, index) {
            var value = rows[0][index];
            if (value) {
              cache.generalInfo.orr[name] = vutil.cleanQuotes(value);
            }
          });
          fns.gotGeneralInfo(undefined, cache.generalInfo);
        }
        else if (rows.length == 0) {
          fns.gotGeneralInfo();  // not found
        }
        else {
          // should not happen.
          console.log("WARN: unexpected number of results: ", rows.length);
        }
      })
      .error(httpErrorHandler(fns.gotGeneralInfo));
  }

  function getTermList($http, cfg, fns) {

    if (cache.termList) {
      //console.log("termList in cache");
      fns.gotTermList(undefined, cache.termList);
      return;
    }

    var query = doReplacements(cfg.orr.termListQuery, {
      'voc.prefix': cfg.voc.prefix,
      'voc.uri':    cfg.voc.uri
    });
    logQuery(query, 'termList');

    $http.get(cfg.orr.sparqlEndpoint, {params: {query: query}})
      .success(function (data, status, headers, config) {
        //console.log("getTermList: data= ", data);

        //var names = data.names;
        var rows = data.values;

        cache.termDict = {};

        cache.termList = _.map(rows, function (e) {
          var item = {};

          _.each(cfg.termList.fields, function(ff, idx) {
            item[ff.name] = e[idx] ? vutil.cleanQuotes(e[idx]) : "";
          });

          var termName = vutil.getTermName(e[0], cfg.voc.prefix);

          cache.termDict[termName] = item;

          return item;
        });

        fns.gotTermList(undefined, cache.termList);
      })
      .error(httpErrorHandler(fns.gotTermList));
  }

  function doReplacements(template, map) {
    var result = template;
    _.each(map, function(val, key) {
      result = result.replace(new RegExp("{{" + key + "}}", 'g'), val);
    });
    return result;
  }

  function getTermDetails($http, cfg, termName, fns) {

    if (termName in cache.termDict) {
      //console.log("term", termName, "in cache");
      var termDetails = cache.termDict[termName];
      fns.gotTermDetails(undefined, termDetails);
      return;
    }

    var termUri = '<' + cfg.voc.prefix + termName + '>';
    var query = doReplacements(cfg.orr.termQueryTemplate, {
      'name':       termUri,
      'voc.prefix': cfg.voc.prefix,
      'voc.uri':    cfg.voc.uri
    });

    logQuery(query);

    $http.get(cfg.orr.sparqlEndpoint, {params: {query: query}})
      .success(function (data, status, headers, config) {
        //console.log("getTermDetails: data= ", data);
        //var names = data.names;
        var rows = data.values;

        if (rows.length == 1) {

          var termDetails = {term: termUri};

          var exceptFirst = _.clone(cfg.termList.fields);
          exceptFirst.shift();
          //console.log("exceptFirst= ", exceptFirst);
          _.each(exceptFirst, function(ff, idx) {
            termDetails[ff.name] = rows[0][idx] ? vutil.cleanQuotes(rows[0][idx]) : "";
          });
          cache.termDict[termName] = termDetails;
          fns.gotTermDetails(undefined, termDetails);
        }
        else if (rows.length == 0) {
          fns.gotTermDetails();  // not found
        }
        else {
          // should not happen.
          console.log("WARN: unexpected number of results: ", rows.length);
        }
      })
      .error(httpErrorHandler(fns.gotTermDetails));
  }

  function getMappings($http, termUri, queryTemplate, sparqlEndpoint, fns) {
    termUri = '<' + termUri + '>';

    var query = doReplacements(queryTemplate, {
      'termUri':  termUri
    });
    //console.log("making query: " + query + "\nagainst: " +sparqlEndpoint);

    $http.get(sparqlEndpoint, {params: {query: query, output: 'json'}, cache: true})
      .success(function (data, status, headers, config) {
        //console.log("getMappings: data= ", data);

        // TODO in general, more generic check/parse of the response.

        var objects;
        if (data.results && data.results.bindings) {
          //console.log("getMappings: data.results.bindings= ", data.results.bindings);
          objects = _.map(data.results.bindings, function(a) { return a.object.value });
        }
        else {
          objects = _.map(data.values, function(a) { return a[0] });
        }

        fns.gotMappings(undefined, objects);
      })
      .error(httpErrorHandler(fns.gotMappings));
  }
  
})();
