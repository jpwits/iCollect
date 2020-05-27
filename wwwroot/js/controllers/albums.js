function AlbumsCtrl($scope, $state, $sessionStorage, $q, $localStorage, getAlbumCollections) {

    //var curTCB = $q.defer();
    //var result = $scope.currentUser();
    //curTCB.promise;

    //if ($sessionStorage.User === undefined) {
    //    $state.go("logins");
    //}
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
        if ($sessionStorage.User === undefined) {
            $state.go("logins");
        }
        $scope.spinLoadingAlbums = true;
        getAlbumCollections.albumcollections($sessionStorage.User.token).query().$promise.then(function (response) {
            var jsonResp = JSON.parse(JSON.stringify(response));
            $sessionStorage.albumCollections = jsonResp.albumsCollections;
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

    $scope.getAlbumCollections();
}
angular
    .module('inspinia')
    .controller('AlbumsCtrl', AlbumsCtrl);
