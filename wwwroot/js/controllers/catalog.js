function CatalogCtrl($scope, $state, $stateParams, $sessionStorage, updateCatalogSrv) {
    $scope.spinUpdateCatalog = "Save";
    $scope.dtStart = new Date($stateParams.catalog.cat.sStartDate);
    $scope.dtEnd = new Date($stateParams.catalog.cat.sEndDate);

    $scope.dateOptions = {
        datepickerMode: 'year',
        minMode: 'year',
        showWeeks: 'false',
        dateDisabled: false,
        formatYear: 'yyyy',
        maxDate: $scope.dtEnd,
        minDate: $scope.dtStart,
        startingDay: 1
    };

    $scope.openStart = function () {
        $scope.popupStart.opened = true;
    };

    $scope.openEnd = function () {
        $scope.popupEnd.opened = true;
    };

    $scope.formats = ['yyyy'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popupStart = {
        opened: false
    };

    $scope.popupEnd = {
        opened: false
    };

    $scope.updateCatalog = function (catalog) {
        $scope.spinUpdateCatalog = "Saving";
        catalog.sStartDate = $scope.dtStart;
        catalog.sEndDate = $scope.dtEnd;

        $scope.entry = new updateCatalogSrv(catalog);
        $scope.entry.$update(function (response) {
            $scope.spinUpdateCatalog = "Save";
            $state.go("app.Catalogs");
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Updating Catalog : " + $sessionStorage.iComsErr.data);
        });
    };

    $(function () {
        $('.selectpicker').selectpicker();
    });
}


angular
    .module('inspinia')
    .controller('CatalogCtrl', CatalogCtrl);