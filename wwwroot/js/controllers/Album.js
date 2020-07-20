function AlbumCtrl($scope, $state, $stateParams, $sessionStorage, $localStorage, $q, updateAlbumCatalogSrv) {
    $scope.spinUpdateAlbum = "Save";

    if ($sessionStorage.albumCatalog.album == undefined) {
        $sessionStorage.albumCatalog.album = {}
        $scope.dtStart = new Date(1987, 1, 1);
        $scope.dtEnd = new Date(2020, 1, 1);
        $sessionStorage.albumCatalog.album.isActive = true;
        $sessionStorage.albumCatalog.album.userId = $sessionStorage.User.name;
    }
    else {
        //var jsonResp = JSON.parse(JSON.stringify(response));
        $scope.jsonRanges = JSON.parse($sessionStorage.albumCatalog.album.jsonRanges);
        $scope.jsonSetTypes = JSON.parse($sessionStorage.albumCatalog.album.jsonSetTypes);
        $scope.dtStart = new Date($sessionStorage.albumCatalog.album.startDate);
        $scope.dtEnd = new Date($sessionStorage.albumCatalog.album.endDate);
    }
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

    $scope.openStart = function () {
        $scope.popupStart.opened = true;
    };

    $scope.openEnd = function () {
        $scope.popupEnd.opened = true;
    };

    $scope.formats = ['yyyy'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popupStart = {
        opened: false
    };

    $scope.popupEnd = {
        opened: false
    };



    $scope.updateAlbum = function (albumCatalog) {
        $scope.spinUpdateAlbum = "Saving";
        albumCatalog.album.startDate = $scope.dtStart;
        albumCatalog.album.endDate = $scope.dtEnd;
        $sessionStorage.albumCatalog.album.jsonRanges = JSON.stringify($scope.jsonRanges);
        $sessionStorage.albumCatalog.album.jsonSetTypes = JSON.stringify($scope.jsonSetTypes);

        $scope.entry = new updateAlbumCatalogSrv(albumCatalog);
        $scope.entry.$update(function (response) {
            $scope.spinUpdateAlbum = "Save";
            $state.go("ui.albums");
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Updating Album : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.RemoveAlbum = (albumCatalog) => {
        if (confirm('Are you sure you want to delete this album, by deleting this album you will loose all the item quantities in this album?')) {
            // Save it!
            albumCatalog.album.isActive = false;
            $scope.entry = new updateAlbumCatalogSrv(albumCatalog);
            $scope.entry.$update(function (response) {
                $sessionStorage.albumCatalogs.push(response);
                //alert("Album Saved successfully...");
                $state.go('ui.albums'); //replace with $scope.apply!
            }, function (error) {
                $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                alert("Error " + $sessionStorage.iComsErr.status + " Deleting Album : " + $sessionStorage.iComsErr.data);
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
