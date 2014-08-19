(function() {
'use strict';

angular.module('scv.flat.controller', [])
    .controller('FlatCtrl', FlatCtrl)
;

FlatCtrl.$inject = ['$scope', 'cfg', 'dataService', 'Works'];

function FlatCtrl($scope, cfg, dataService, Works) {
    Works.works.removeAll();
    $scope.works = Works.works;

    $scope.totalTerms = 0;
    $scope.termList = [];

    function getTermList($scope, dataService) {
        var workId = $scope.works.add("making term list query");

        var gotTermList = function(error, termList) {
            //console.log("gotTermList: ", termList);

            $scope.totalTerms = 0;
            if (error) {
                $scope.works.remove(workId);
                $scope.error = error;
                $scope.errors.add(error);
                return;
            }

            $scope.totalTerms = termList.length;

            $scope.termList = _.map(termList, function(term) {
                var item = {};
                _.each(cfg.termList.fields, function(field, idx) {
                    var value = term[field.name];
                    item[field.name] = _.escape(idx === 0 ? vutil.getTermName(value) : value);
                });
                return item;
            });
            $scope.works.remove(workId);
        };

        dataService.getTermList({gotTermList: gotTermList});
    }

    getTermList($scope, dataService);
}
})();
