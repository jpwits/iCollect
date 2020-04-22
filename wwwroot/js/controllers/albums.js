function AlbumsCtrl($scope, $state, passData, $timeout, $q) {
    $scope.User = passData.get("User");

    //$scope.rangeGroup = passData.get("$scope.rangeGroup");
    //$scope.typeGroup = passData.get("$scope.typeGroup");

    $scope.UpdateAlbum = (album) => {
        if (album === undefined) {
            $state.go('ui.album');
        }
    };
    //$scope.fillLookups = () => {
    //    getLookups.get().$promise.then(function (response) {
    //        var Lookups = JSON.parse(JSON.stringify(response));
    //        $scope.rangeGroup = Lookups.rangeGroup;
    //        $scope.typeGroup = Lookups.typeGroup;
    //    }, function (error) {
    //        alert("Error getting orders from back-end : " + error);
    //    });
    //};
}
angular
    .module('inspinia')
    .controller('AlbumsCtrl', AlbumsCtrl);
