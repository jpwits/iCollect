
function SetCtrl($scope, $state, $compile, $templateCache, getImage, updateImage, passData, $timeout) {
    $scope.iCol = passData.get("Selected");

    $scope.UpdateSet = function (sets) {
        var clone = Object.assign({}, sets);
        clone.items = clone.items.concat(clone.delImages);
        $scope.entry = new updateImage(clone);
        $scope.entry.$update(function (response) {

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
                newImage = new getImage();
                newImage.type = event.target.result.split(';')[0].split(':')[1];
                newImage.image = event.target.result.replace('data:' + newImage.type + ';base64,', '');
                newImage.thumbnail = null;
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
        $scope.iCol.items.push($scope.iCol.items[pos]);
        $scope.iCol.items.splice(pos, 1);

        //$scope.iCol.items[pos].isActive = false;
        // $scope.iCol.items = $scope.iCol.items.sort(function (a, b) {
        //     return a.position - b.position;
        // }).filter(img => img.isActive === true);

        $scope.iCol.items.forEach(function (image, index) {
            $scope.iCol.items[index].position = index;
        });

        //Jos : replace these #state.go's with single $compile
    };


}

angular
    .module('inspinia')
    .controller('SetCtrl', SetCtrl);