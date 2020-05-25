function SetCtrl($window, $scope, $state, $sessionStorage, $q, updateSet) {
    var curTCB = $q.defer();
    var result = $scope.currentUser();
    curTCB.promise;

    if ($sessionStorage.User === undefined) {
        $state.go("logins");
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
    $scope.goBack = function () {
        $window.history.back();
    }

    if ($sessionStorage.newSet === true) {
        $sessionStorage.newSet = false;
        $scope.iSet = undefined;
        $sessionStorage.curSetIdx = undefined;
        //Ok waisting time doing all these flip flop UI logic --> Do SMUI!!
    }
    else {
        if ($sessionStorage.curSetIdx !== undefined) {
            $scope.iSet = $sessionStorage.iColSets.data[$sessionStorage.curSetIdx];
        }
    }

    $scope.searchButtonText = "Save";

    $scope.UpdateSet = function (set) {
        if (set.setId === undefined) {
            set.setId = 0;
            set.year = set.date.getFullYear();
            set.collectionId = 1;
            set.isActive = true;
        }
        $scope.searchButtonText = "Saving";
        var clone = Object.assign({}, set);
        if (clone.delItems !== undefined) {
            clone.items = clone.items.concat(clone.delItems);
        }
        $scope.entry = new updateSet(clone);
        $scope.entry.$update(function (response) {
            if (response.items.length > 0) {
                response.delItems = response.items.filter(item => item.isActive === false);
                response.items = response.items.sort(function (a, b) {
                    return a.position - b.position;
                }).filter(item => item.isActive === true);
            }
            $scope.iSet = response;

            if ($sessionStorage.curSetIdx === undefined) {
                $sessionStorage.iColSets.data.push($scope.iSet);
            }
            else {
                $sessionStorage.iColSets.data[$sessionStorage.curSetIdx] = $scope.iSet;
            }
            //alert("Saved successfully...");
            $scope.searchButtonText = "Save";
            $window.history.back();

        }, function (error) {
            $scope.searchButtonText = "Save";
            alert("Error Updating Set : " + error);
        });
    };

    $scope.uploadFiles = function (files, iCol) {
        files.forEach(function (file, index) {
            var fReader = new FileReader();
            fReader.readAsDataURL(file);
            fReader.onloadend = function (event) {
                newImage = {};
                newImage.type = event.target.result.split(';')[0].split(':')[1];
                newImage.imageIdANavigation = {};
                newImage.imageIdANavigation.image = event.target.result.replace('data:' + newImage.type + ';base64,', '');
                newImage.imageIdANavigation.type = event.target.result.split(';')[0].split(':')[1];
                newImage.thumbnailA = null;
                newImage.isActive = true;

                if ($scope.iSet.items.length === 0) {
                    newImage.position = 0;
                }
                else {
                    newImage.position = $scope.iSet.items[$scope.iSet.items.length - 1].position + 1;
                }
                $scope.iSet.items.push(newImage);

                if (newImage.position === files.length - 1) {
                    $state.go("app.set");
                }
            };
        });
    };

    $scope.uploadReverse = function (file, item) {
        fReader = new FileReader();
        fReader.readAsDataURL(file);

        fReader.onloadend = function (event) {
            item.type = event.target.result.split(';')[0].split(':')[1];
            item.imageIdBNavigation = {};
            item.imageIdBNavigation.image = event.target.result.replace('data:' + item.type + ';base64,', '');
            item.imageIdBNavigation.type = event.target.result.split(';')[0].split(':')[1];
            item.thumbnailB = null;
            item.isActive = true;
            $state.go("app.set");
        };
    };
    $scope.ImageOrderUp = function (pos) {
        if (pos > 0 && pos <= $scope.iSet.items.length - 1) {
            $scope.iSet.items[pos].position--;
            $scope.iSet.items[pos - 1].position++;
        }
        $scope.iSet.items = $scope.iSet.items.sort(function (a, b) {
            return a.position - b.position;
        }).filter(img => img.isActive === true);
    };

    $scope.ImageOrderDown = function (pos) {
        if (pos >= 0 && pos < $scope.iSet.items.length - 1) {
            $scope.iSet.items[pos].position++;
            $scope.iSet.items[pos + 1].position--;
        }
        $scope.iSet.items = $scope.iSet.items.sort(function (a, b) {
            return a.position - b.position;
        }).filter(img => img.isActive === true);
    };

    $scope.Delete = function (pos) {
        $scope.iSet.items[pos].isActive = false;
        $scope.iSet.delItems.push($scope.iSet.items[pos]);
        $scope.iSet.items.splice(pos, 1);

        $scope.iSet.items.forEach(function (image, index) {
            $scope.iSet.items[index].position = index;
        });
    };

    $scope.DeleteSet = function (set) {
        $scope.iSet.items.forEach(function (image, index) {
            $scope.iSet.items[index].isActive = false;
        });
        if (confirm('Are you sure you want to delete this set?!!!')) {
            $scope.iSet.isActive = false;
            $scope.UpdateSet($scope.iSet);
        }
    };

    $(function () {
        $('.selectpicker').selectpicker();
    });
}

angular
    .module('inspinia')
    .controller('SetCtrl', SetCtrl);