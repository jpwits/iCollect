function SetCtrl($scope, $state, $sessionStorage, updateSet) {
    $scope.iCol = $sessionStorage.iColSets.data[$sessionStorage.curSetIdx];

    $scope.UpdateSet = function (sets) {
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
            alert("Saved successfully...");
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
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

                if ($scope.iCol.items.length === 0) {
                    newImage.position = 0;
                }
                else {
                    newImage.position = $scope.iCol.items[$scope.iCol.items.length - 1].position + 1;
                }
                $scope.iCol.items.push(newImage);

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
        if (pos > 0 && pos <= $scope.iCol.items.length - 1) {
            $scope.iCol.items[pos].position--;
            $scope.iCol.items[pos - 1].position++;
        }
        $scope.iCol.items = $scope.iCol.items.sort(function (a, b) {
            return a.position - b.position;
        }).filter(img => img.isActive === true);
    };

    $scope.ImageOrderDown = function (pos) {
        if (pos >= 0 && pos < $scope.iCol.items.length - 1) {
            $scope.iCol.items[pos].position++;
            $scope.iCol.items[pos + 1].position--;
        }
        $scope.iCol.items = $scope.iCol.items.sort(function (a, b) {
            return a.position - b.position;
        }).filter(img => img.isActive === true);
    };

    $scope.Delete = function (pos) {
        $scope.iCol.items[pos].isActive = false;
        $scope.iCol.delItems.push($scope.iCol.items[pos]);
        $scope.iCol.items.splice(pos, 1);

        $scope.iCol.items.forEach(function (image, index) {
            $scope.iCol.items[index].position = index;
        });
    };
}

angular
    .module('inspinia')
    .controller('SetCtrl', SetCtrl);