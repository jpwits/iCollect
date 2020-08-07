
function CatalogsCtrl($scope, $state, $stateParams, $compile, $templateCache, getCatalogSrv, passData, $timeout) {
    $scope.catalog_pglen = passData.get("catalog_pglen");
    if ($scope.catalog_pglen === undefined) { $scope.catalog_pglen = 10; }

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
        $state.go('app.setsng');
    }

    $scope.editCatalog = function (cat) {
        $state.go('app.catalog', {
             catalog: { cat }
        });
    }

    $scope.loadCatalog = function (id) {
        getCatalogSrv.get({ id: id }).$promise.then(function (response) {
            var curCatalog = JSON.parse(JSON.stringify(response));
            //curCatalog.delItems = curCatalog.items.filter(img => img.isActive === false);
            //curCatalog.items = curCatalog.items.sort(function (a, b) {
            //    return a.position - b.position;
            //}).filter(img => img.isActive === true);
            passData.set("CurCatalog", curCatalog);
            $state.go('app.catalog', {
                catalog: { curCatalog }
            });
        },
        function (error) {
            alert("Error Retrieving catalogs : " + error);
        });
    };
}

angular
    .module('inspinia')
    .controller('CatalogsCtrl', CatalogsCtrl);

   