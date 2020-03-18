function SetsNgCtrl($scope, $state, DTOptionsBuilder, DTColumnBuilder, $compile, $templateCache, getSetSrv, getSetsSrvNg, passData, $timeout, $q) {
    $scope.session_pglen = passData.get("Session_PgLen");
    $scope.iColSets = passData.get("$scope.iColSets");

    if ($scope.session_pglen === undefined) { $scope.session_pglen = 50; }
    if ($scope.iColSets === undefined) {
        getSetsSrvNg.get({ start: '0', length: '10' }).$promise.then(function (response) {
            $scope.iColSets = JSON.parse(JSON.stringify(response));
            //var table = $('#entry-grid').dataTable();

            //var table = angular.element('#entry-grid').dataTable();
            //passData.set("Session_PgLen", table.page.len());
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    }

    $scope.selectPart = (event) => {
        if (event.currentTarget.checked === true) {
            event.currentTarget.previousSibling.style.border = "2px solid green";
        }
        else {
            event.currentTarget.previousSibling.style.border = "2px solid grey";
        }
    };

    $scope.selectSet = (event, idx) => {
        $scope.iColSet = $scope.iColSets.data[idx];
        passData.set("$scope.iColSets", $scope.iColSets);
        passData.set("$scope.iColSet", $scope.iColSet);
        $state.go('app.sets_edit');
    };

    $scope.createSet = function (id) {
        if (id === undefined) {
            var iCol = new getSetSrv();
            iCol.setImages = [];
            iCol.delImages = [];
            passData.set("Selected", iCol);
            $state.go('app.sets_edit', {});
        }
    };
}

angular
    .module('inspinia')
    .controller('SetsNgCtrl', SetsNgCtrl);