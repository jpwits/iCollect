function AlbumsCtrl($scope, $state, $sessionStorage, $localStorage, getAlbumCollections) {
    $scope.currentUser();
    if ($sessionStorage.User === undefined) {
        $state.go("logins");
    }
    $scope.spinLoadingAlbums = false;

    $scope.GotoAlbum = (albumCollection) => {
        $sessionStorage.album = albumCollection.album;
        $state.go('app.setsng', { viewLayout: 'Tiles' });
    };

    $scope.EditAlbum = (albumCollection) => {
        $sessionStorage.albumCollection = albumCollection;
        $state.go('ui.album');
    };

    $scope.NewAlbum = () => {
        $sessionStorage.albumCollection = {};
        $state.go('ui.album');
    };

    $scope.getAlbumCollections = () => {
        $scope.spinLoadingAlbums = true;
        getAlbumCollections.get().$promise.then(function (response) {
            var jsonResp = JSON.parse(JSON.stringify(response));
            $sessionStorage.albumCollections = jsonResp.albumsCollections;
            $scope.spinLoadingAlbums = false;

        }, function (error) {
            $scope.spinLoadingAlbums = false;
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                alert("Error " + $sessionStorage.iComsErr.status +" Retrieving Albums : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.getAlbumCollections();
}
angular
    .module('inspinia')
    .controller('AlbumsCtrl', AlbumsCtrl);
