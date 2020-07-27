function CollectionsCtrl($scope, $state, $sessionStorage, $q, $localStorage, getCatalogCollections) {
    $scope.spinLoadingCollections = false;

    $scope.GotoCollection = (catalogCollection) => {
        $sessionStorage.collection = catalogCollection.collection;
        $state.go('app.setsng', { viewLayout: 'Tiles'});
    };

    $scope.EditCollection = (catalogCollection) => {
        $sessionStorage.catalogCollection = catalogCollection;
        $state.go('ui.collection');
    };

    $scope.NewCollection = () => {
        $sessionStorage.catalogCollection = {};
        $state.go('ui.collection');
    };

    $scope.getCatalogCollections = () => {
        if ($sessionStorage.User === undefined) {
            $state.go("logins");
            return;
        }
        $scope.spinLoadingCollections = true;
        getCatalogCollections.CatalogCollections($sessionStorage.User.token).query().$promise.then(function (response) {
            var jsonResp = JSON.parse(JSON.stringify(response));
            $sessionStorage.CatalogCollections = jsonResp.catalogCollections;
            $scope.spinLoadingCollections = false;

        }, function (error) {
            $scope.spinLoadingCollections = false;
            var errorMsg = "";
            if (error.status === 401) {
                errorMsg = "Unauthorised";
            }
            else {
                errorMsg = error.data;
            }
            alert("Error " + $sessionStorage.iComsErr.status + " Retrieving Collection : " + errorMsg);
        });
    };

    $scope.getCatalogCollections();
}
angular
    .module('inspinia')
    .controller('CollectionsCtrl', CollectionsCtrl);
