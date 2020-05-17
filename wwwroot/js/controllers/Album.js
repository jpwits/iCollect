function AlbumCtrl($scope, $state, $stateParams, $sessionStorage, $localStorage,  updateAlbumCollectionSrv) {
    $scope.currentUser();
    if ($sessionStorage.User === undefined) {
        $state.go("logins");
    }
    $scope.spinUpdateAlbum = "Save";

    if ($sessionStorage.albumCollection.album == undefined) {
        $sessionStorage.albumCollection.album = {}
        $scope.dtStart = new Date(1987, 1, 1);
        $scope.dtEnd = new Date(2020, 1, 1);
        $sessionStorage.albumCollection.album.isActive = true;
        $sessionStorage.albumCollection.album.userId = $sessionStorage.User.name;
    }
    else {
        //var jsonResp = JSON.parse(JSON.stringify(response));
        $scope.jsonRanges = JSON.parse($sessionStorage.albumCollection.album.jsonRanges);
        $scope.jsonSetTypes = JSON.parse($sessionStorage.albumCollection.album.jsonSetTypes);
        $scope.dtStart = new Date($sessionStorage.albumCollection.album.startDate);
        $scope.dtEnd = new Date($sessionStorage.albumCollection.album.endDate);
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



    $scope.updateAlbum = function (albumCollection) {
        $scope.spinUpdateAlbum = "Saving";
        albumCollection.album.startDate = $scope.dtStart;
        albumCollection.album.endDate = $scope.dtEnd;
        $sessionStorage.albumCollection.album.jsonRanges = JSON.stringify($scope.jsonRanges);
        $sessionStorage.albumCollection.album.jsonSetTypes = JSON.stringify($scope.jsonSetTypes);

        $scope.entry = new updateAlbumCollectionSrv(albumCollection);
        $scope.entry.$update(function (response) {
            $scope.spinUpdateAlbum = "Save";
            $state.go("ui.albums");
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Updating Album : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.RemoveAlbum = (albumCollection) => {
        if (confirm('Are you sure you want to delete this album, by deleting this album you will loose all the item quantities in this album?')) {
            // Save it!
            albumCollection.album.isActive = false;
            $scope.entry = new updateAlbumCollectionSrv(albumCollection);
            $scope.entry.$update(function (response) {
                $sessionStorage.albumCollections.push(response);
                //alert("Album Saved successfully...");
                $state.go('ui.albums');
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
