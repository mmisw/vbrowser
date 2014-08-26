(function() {
'use strict';

angular.module('vbrowser.term.controller', ['trNgGrid'])

    .controller('TermCtrl', ['$scope', '$routeParams', 'cfg', 'dataService', 'Works',
        function ($scope, $routeParams, cfg, dataService, Works) {

            Works.works.removeAll();
            $scope.works = Works.works;

            $scope.termName = $routeParams.term;
            //console.log("$scope.termName=", $scope.termName);

            $scope.termDetails = {};

            prepareMappings($scope, cfg);

            getTermDetails($scope, cfg, dataService);
        }])
    ;


function getTermDetails($scope, cfg, dataService) {
    var workId = $scope.works.add("making term details query");

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
                //console.log('termDetails', termDetails);
                var termUri = cfg.voc.prefix + $scope.termName;
                $scope.externalLink = termUri;


                var item = {
                    found:   true,
                    orrUri:  '<a href="' +$scope.externalLink+ '">' + $scope.externalLink + '</a>'
                };

                _.each(cfg.termList.fields, function(field, idx) {
                   item[field.name] = termDetails[field.name];
                });

                $scope.termDetails = item;

                getMappings($scope, cfg, dataService, termUri, 'orr');
            }
            else {
                $scope.termDetails = {found: false};
            }

            $scope.works.remove(workId);
        }
    });
}

function prepareMappings($scope, cfg) {
    $scope.mappingPredicates = cfg.mapping.predicates;

    $scope.mappingResults = {orr: {}};
    _.each($scope.mappingPredicates, function(pred) {
        $scope.mappingResults.orr[pred.predicate] = [];
        $scope.mappingResults.orr[pred.predicate].searching = false;
    });

}

function getMappings($scope, cfg, dataService, termUri, repo) {
    var sparqlEndpoint = cfg[repo].sparqlEndpoint;
    var workId = $scope.works.add("making mapping queries");
    _.each(cfg.mapping.predicates, function(pred) {
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
                $scope.mappingResults[repo][pred.predicate] = objects;
            }
        });
    });
    $scope.works.remove(workId);
}

})();
