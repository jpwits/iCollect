function SetCtrl($scope, $state, $sessionStorage, $q, updateSet) {
    var curTCB = $q.defer();
    var result = $scope.currentUser();
    curTCB.promise;

    if ($sessionStorage.User === undefined) {
        $state.go("logins");
    }

    $scope.iSet = $sessionStorage.iColSets.data[$sessionStorage.curSetIdx];

    $scope.searchButtonText = "Save";

    $scope.UpdateSet = function (sets) {
        $scope.searchButtonText = "Saving";
        var clone = Object.assign({}, sets);
        if (clone.delItems !== undefined) {
            clone.items = clone.items.concat(clone.delItems);
        }
        $scope.entry = new updateSet(clone);
        $scope.entry.$update(function (response) {
            iCol = response;
            if (iCol.items.length > 0) {
                iCol.delItems = iCol.items.filter(item => item.isActive === false);
                iCol.items = iCol.items.sort(function (a, b) {
                    return a.position - b.position;
                }).filter(item => item.isActive === true);
            }
            //iCol = iCol;
            //alert("Saved successfully...");
            $scope.searchButtonText = "Save";

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
}

angular
    .module('inspinia')
    .controller('SetCtrl', SetCtrl);