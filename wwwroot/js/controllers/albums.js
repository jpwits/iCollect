function AlbumsCtrl($scope, $state, getAlbums, passData, $timeout, $q) {
    $scope.User = passData.get("User");

    $scope.SelectAlbum = (album) => {
        if (album === undefined) {
            $state.go('ui.album');
        }
    };

    $scope.getAlbums = () => {
        $scope.iColAlbums = passData.get("$scope.albums");
        if ($scope.iColAlbums !== undefined) {
            //$scope.totalItems = $scope.iColSets.totalItems;
        } else {
            getAlbums.get().$promise.then(function (response) {
                $scope.iColAlbums = JSON.parse(JSON.stringify(response));
            }, function (error) {
                alert("Error getting orders from back-end : " + error);
            });
        }
    };

    $scope.getAlbums();
}
angular
    .module('inspinia')
    .controller('AlbumsCtrl', AlbumsCtrl);
