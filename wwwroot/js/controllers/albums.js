function AlbumsCtrl($scope, $state, $sessionStorage, $localStorage, getAlbums) {
    if ($sessionStorage.User === undefined) {
        $state.go("logins");
    }
    $scope.spinLoadingAlbums = false;

    $scope.GotoAlbum = (album) => {
        $sessionStorage.album = album;
        $state.go('app.setsng', { viewLayout: 'Tiles' });
    };

    $scope.EditAlbum = (album) => {
        $sessionStorage.album = album;
        $state.go('ui.album');
    };

    $scope.NewAlbum = () => {
        $sessionStorage.album = {};
        $state.go('ui.album');
    };

    $scope.getAlbums = () => {
        $scope.spinLoadingAlbums = true;
        getAlbums.get().$promise.then(function (response) {
            var jsonResp = JSON.parse(JSON.stringify(response));
            $sessionStorage.albums = jsonResp.albums;
            $scope.spinLoadingAlbums = false;

        }, function (error) {
            $scope.spinLoadingAlbums = false;
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                alert("Error " + $sessionStorage.iComsErr.status +" Retrieving Albums : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.getAlbums();
}
angular
    .module('inspinia')
    .controller('AlbumsCtrl', AlbumsCtrl);
