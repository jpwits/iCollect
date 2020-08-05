
function CatalogsCtrl($scope, $state, $stateParams, $compile, $templateCache, getCatalogSrv, passData, $timeout) {
    $scope.catalog_pglen = passData.get("catalog_pglen");
    if ($scope.catalog_pglen === undefined) { $scope.catalog_pglen = 10; }

    $scope.createCatalog = function () {
            passData.set("CurCatalog", { items: [], delItems: [] });
            $state.go('app.catalog');
    };

    $scope.gotoCatalog = function (cat) {
        $state.go('app.setsng');
    }

    $scope.editCatalog = function (cat) {
        $state.go('app.catalog', {
            viewLayout: null, catalog: { cat }
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
            $state.go('app.catalog');
        },
        function (error) {
            alert("Error Retrieving catalogs : " + error);
        });
    };
}

angular
    .module('inspinia')
    .controller('CatalogsCtrl', CatalogsCtrl);

   