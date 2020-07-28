function CollectionCtrl($scope, $state, $stateParams, $sessionStorage, $localStorage, $q, updateCatalogCollectionsrv) {
    $scope.spinUpdateCollection = "Save";

    if ($sessionStorage.catalogCollection.collection == undefined) {
        $sessionStorage.catalogCollection.collection = {}
        $scope.dtStart = new Date(1987, 1, 1);
        $scope.dtEnd = new Date(2020, 1, 1);
        $sessionStorage.catalogCollection.collection.isActive = true;
        $sessionStorage.catalogCollection.collection.userId = $sessionStorage.User.name;
    }
    else {
        //var jsonResp = JSON.parse(JSON.stringify(response));
        $scope.jsonRanges = JSON.parse($sessionStorage.catalogCollection.collection.jsonRanges);
        $scope.jsonSetTypes = JSON.parse($sessionStorage.catalogCollection.collection.jsonSetTypes);
        $scope.dtStart = new Date($sessionStorage.catalogCollection.collection.startDate);
        $scope.dtEnd = new Date($sessionStorage.catalogCollection.collection.endDate);
    }
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

    $scope.toCats = function() {
        $state.go('app.catalogs');
    }

    $scope.updateCollection = function (catalogCollection) {
        $scope.spinUpdateCollection = "Saving";
        catalogCollection.collection.startDate = $scope.dtStart;
        catalogCollection.collection.endDate = $scope.dtEnd;
        $sessionStorage.catalogCollection.collection.jsonRanges = JSON.stringify($scope.jsonRanges);
        $sessionStorage.catalogCollection.collection.jsonSetTypes = JSON.stringify($scope.jsonSetTypes);

        $scope.entry = new updateCatalogCollectionsrv(catalogCollection);
        $scope.entry.$update(function (response) {
            $scope.spinUpdateCollection = "Save";
            $state.go("ui.Collections");
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Updating Collection : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.RemoveCollection = (catalogCollection) => {
        if (confirm('Are you sure you want to delete this collection, by deleting this collection you will loose all the item quantities in this collection?')) {
            // Save it!
            if (catalogCollection.isMaster === true) {
                alert("In order to remove the master collection, you have to remove it's catalog...")
            }
            else {
                catalogCollection.collection.isActive = false;
                $scope.entry = new updateCatalogCollectionsrv(catalogCollection);
                $scope.entry.$update(function (response) {
                    $sessionStorage.CatalogCollections.push(response);
                    //alert("Collection Saved successfully...");
                    $state.go('ui.Collections'); //replace with $scope.apply!
                }, function (error) {
                    $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                    alert("Error " + $sessionStorage.iComsErr.status + " Deleting Collection : " + $sessionStorage.iComsErr.data);
                });
            }
        }
    };

    $(function () {
        $('.selectpicker').selectpicker();
    });
}
angular
    .module('inspinia')
    .controller('CollectionCtrl', CollectionCtrl);
