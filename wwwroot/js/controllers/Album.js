function AlbumCtrl($scope, $state, $stateParams, passData, getLookups, updateAlbumSrv) {
    $scope.User = passData.get("User");

    $scope.rangeGroup = passData.get("$scope.rangeGroup");
    $scope.typeGroup = passData.get("$scope.typeGroup");

    $scope.fillLookups = () => {
        getLookups.get().$promise.then(function (response) {
            var Lookups = JSON.parse(JSON.stringify(response));
            $scope.rangeGroup = Lookups.rangeGroup;
            $scope.typeGroup = Lookups.typeGroup;
            $(function () {
                $('.selectpicker').selectpicker();
            });
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    if ($scope.rangeGroup === undefined || $scope.typeGroup === undefined) {
        $scope.fillLookups();
    }

    $scope.today = function () {
        $scope.dtStart = new Date(1987, 1, 1);
        $scope.dtEnd = new Date(2020, 1, 1);
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dtStart = new Date(1987, 1, 1);
    };

    $scope.dateOptions = {
        datepickerMode: 'year',
        minMode: 'year',
        //minDate: 'minDate',
        showWeeks: 'false',
        dateDisabled: false,
        formatYear: 'yyyy',
        maxDate: $scope.dtEnd,
        minDate: $scope.dtStart,
        startingDay: 1
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['yyyy'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.updateAlbum = function (album) {
        $scope.entry = new updateAlbumSrv(album);
        $scope.entry.$update(function (response) {
            sets = response;
            alert("Album Saved successfully...");
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };
}
angular
    .module('inspinia')
    .controller('AlbumCtrl', AlbumCtrl);
