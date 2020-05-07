function AlbumsCtrl($scope, $state, $sessionStorage, $localStorage, $stateParams, getAlbums, passData, $timeout, $q) {
    $scope.User = passData.get("User");

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
            alert("Error retrieving albums : " + error);
        });
    };

    $scope.getAlbums();
}
angular
    .module('inspinia')
    .controller('AlbumsCtrl', AlbumsCtrl);
