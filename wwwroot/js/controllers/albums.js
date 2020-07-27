function AlbumsCtrl($scope, $state, $sessionStorage, $q, $localStorage, getAlbumCatalogs) {
    $scope.spinLoadingAlbums = false;

    $scope.GotoAlbum = (albumCatalog) => {
        $sessionStorage.album = albumCatalog.album;
        $state.go('app.setsng', { viewLayout: 'Tiles'});
    };

    $scope.EditAlbum = (albumCatalog) => {
        $sessionStorage.albumCatalog = albumCatalog;
        $state.go('ui.album');
    };

    $scope.NewAlbum = () => {
        $sessionStorage.albumCatalog = {};
        $state.go('ui.album');
    };

    $scope.getAlbumCatalogs = () => {
        if ($sessionStorage.User === undefined) {
            $state.go("logins");
            return;
        }
        $scope.spinLoadingAlbums = true;
        getAlbumCatalogs.albumcatalogs($sessionStorage.User.token).query().$promise.then(function (response) {
            var jsonResp = JSON.parse(JSON.stringify(response));
            $sessionStorage.albumCatalogs = jsonResp.albumsCatalogs;
            $scope.spinLoadingAlbums = false;

        }, function (error) {
            $scope.spinLoadingAlbums = false;
            var errorMsg = "";
            if (error.status === 401) {
                errorMsg = "Unauthorised";
            }
            else {
                errorMsg = error.data;
            }
            alert("Error " + $sessionStorage.iComsErr.status + " Retrieving Albums : " + errorMsg);
        });
    };

    $scope.getAlbumCatalogs();
}
angular
    .module('inspinia')
    .controller('AlbumsCtrl', AlbumsCtrl);
