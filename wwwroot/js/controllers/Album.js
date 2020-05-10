function AlbumCtrl($scope, $state, $stateParams, $sessionStorage, $localStorage, updateAlbumSrv) {
    if ($sessionStorage.User === undefined) {
        $state.go("logins");
    }

    $scope.spinUpdateAlbum = "Save";

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
        $scope.spinUpdateAlbum = "Saving";
        if (album.albumId === undefined) {
            album.isActive = true;
        }
        $scope.entry = new updateAlbumSrv(album);
        $scope.entry.$update(function (response) {
            $sessionStorage.albums.push(response);
            $scope.spinUpdateAlbum = "Save";
            //alert("Album Saved successfully...");
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                alert("Error " + $sessionStorage.iComsErr.status +" Updating Album : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.RemoveAlbum = (album) => {
        if (confirm('Are you sure you want to delete this album, by deleting this album you will loose all the item quantities in this album?')) {
            // Save it!
            album.isActive = false;
            $scope.entry = new updateAlbumSrv(album);
            $scope.entry.$update(function (response) {
                $sessionStorage.albums.push(response);
                alert("Album Saved successfully...");
                $state.go('ui.albums');
            }, function (error) {
                $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                    alert("Error " + $sessionStorage.iComsErr.status +" Deleting Album : " + $sessionStorage.iComsErr.data);
            });
        }
    };

    $(function () {
        $('.selectpicker').selectpicker();
    });
}
angular
    .module('inspinia')
    .controller('AlbumCtrl', AlbumCtrl);
