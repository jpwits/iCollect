
function CatalogsCtrl($scope, $sessionStorage, $state, $stateParams, $compile, $templateCache, getCatalogsSrv, getCatalogSrv,  $timeout) {

    $scope.getCatalogs = () => {
        getCatalogsSrv.get().$promise.then(function (response) {
            var jsonResp = JSON.parse(JSON.stringify(response));
            $sessionStorage.iCats = jsonResp.data;
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Retrieving Catalogs : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.getCatalogs();
  
    $scope.createCatalog = function () {
        cat = {};
        cat.catalogId = 0;
        cat.audience = 1;
        cat.sStartDate = new Date(1900, 1, 1);
        cat.sEndDate = new Date(2020, 1, 1);
        cat.isActive = true;
        $state.go('app.catalog', {
             catalog: { cat }
        });
    };

    $scope.gotoCatalog = function (cat) {
        $state.go('app.setsng',{
            viewLayout: null, catId: cat.catalogId
        });
    }

    $scope.editCatalog = function (cat) {
        $state.go('app.catalog', {
             catalog: { cat }
        });
    }

    //$scope.loadCatalog = function (id) {
    //    getCatalogSrv.get({ id: id }).$promise.then(function (response) {
    //        var curCatalog = JSON.parse(JSON.stringify(response));
    //        $state.go('app.catalog', {
    //            catalog: { curCatalog }
    //        });
    //    },
    //    function (error) {
    //        alert("Error Retrieving catalogs : " + error);
    //    });
    //};
}

angular
    .module('inspinia')
    .controller('CatalogsCtrl', CatalogsCtrl);

   