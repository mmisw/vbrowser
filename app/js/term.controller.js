(function() {
'use strict';

angular.module('scv.term.controller', ['trNgGrid'])

    .controller('TermCtrl', ['$scope', '$routeParams', 'cfg', 'dataService', 'Works',
        function ($scope, $routeParams, cfg, dataService, Works) {

            Works.works.removeAll();
            $scope.works = Works.works;

            $scope.termName = $routeParams.term;
            //console.log("$scope.termName=", $scope.termName);

            $scope.termDetails = {};

            prepareMappings($scope);

            getTermDetails($scope, cfg, dataService);
        }])
    ;


function getTermDetails($scope, cfg, dataService) {
    var workId = $scope.works.add("making term details query");
    var htmlify = true;

    function processContent(content) {
        return htmlify ? vutil.htmlifyObject(content, dataService.cachedTermDict()) : _.escape(content);
    }

    $scope.termDetails.searching = true;
    $scope.nercExternalLink = undefined;
    dataService.getTermDetails($scope.termName, {
        gotTermDetails: function(error, termDetails) {
            //console.log("gotTermDetails: ", termDetails);

            $scope.termDetails.searching = false;
            if (error) {
                $scope.termDetails = {found: false};
                $scope.works.remove(workId);
                $scope.errors.add(error);
                return;
            }

            if (termDetails) {
                console.log('termDetails', termDetails);
                var termUri = scvConfig.voc.prefix + $scope.termName;
                $scope.externalLink = termUri;


                var item = {
                    found:   true,
                    orrUri:  '<a href="' +$scope.externalLink+ '">' + $scope.externalLink + '</a>'
                };

                _.each(cfg.termList.fields, function(field, idx) {
                   item[field.name] = processContent(termDetails[field.name]);
                });

                $scope.termDetails = item;
//                $scope.termDetails = {
//                    found:          true,
//                    definition:     processContent(termDetails.definition),
//                    canonicalUnits: processContent(termDetails.canonicalUnits),
//                    orrUri:        '<a href="' +$scope.externalLink+ '">' + $scope.externalLink + '</a>'
//                };
                getMappings($scope, dataService, termUri, 'orr');
            }
            else {
                $scope.termDetails = {found: false};
            }

            $scope.works.remove(workId);
        }
    });
}

function prepareMappings($scope) {
    $scope.mappingPredicates = scvConfig.mapping.predicates;

    $scope.mappingResults = {orr: {}};
    _.each($scope.mappingPredicates, function(pred) {
        $scope.mappingResults.orr[pred.predicate] = [];
        $scope.mappingResults.orr[pred.predicate].searching = false;
    });

}

function getMappings($scope, dataService, termUri, repo) {
    var sparqlEndpoint = scvConfig[repo].sparqlEndpoint;
    var workId = $scope.works.add("making mapping queries");
    _.each(scvConfig.mapping.predicates, function(pred) {
        $scope.works.update(workId, "making mapping query for " + pred.label);
        $scope.mappingResults[repo][pred.predicate].searching = true;
        dataService.getMappings(termUri, pred.queryTemplate, sparqlEndpoint, {
            gotMappings: function(error, objects) {
                $scope.mappingResults[repo][pred.predicate].searching = false;
                if (error) {
                    $scope.errors.add(error);
                    return;
                }

                //console.log("GOT objects", objects, "for predicate", pred.label);
                $scope.mappingResults[repo][pred.predicate] = _.map(objects, function(o) {
                    return vutil.mkExternalLink4Uri(o, true);
                });
            }
        });
    });
    $scope.works.remove(workId);
}

})();
