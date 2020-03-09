
function SetEditCtrl($scope, $state, $compile, $templateCache, getImage, updateImage, passData, $timeout) {
    $scope.iCol = passData.get("Selected");

    $scope.UpdateSet = function (sets) {
        var clone = Object.assign({}, sets);
        clone.setImages = clone.setImages.concat(clone.delImages);
        $scope.entry = new updateImage(clone);
        $scope.entry.$update(function (response) {

            alert("Saved successfully...");
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
        //sets.setImages.splice($scope.noOfImages);
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

                if ($scope.iCol.setImages.length === 0) {
                    newImage.position = 0;
                }
                else {
                    newImage.position = $scope.iCol.setImages[$scope.iCol.setImages.length - 1].position + 1;
                }
                $scope.iCol.setImages.push(newImage);

                if (newImage.position === files.length - 1) {
                    $state.go("app.sets_edit");
                }
            };
        });
    };

    $scope.ImageOrderUp = function (pos) {
        if (pos > 0 && pos <= $scope.iCol.setImages.length - 1) {
            $scope.iCol.setImages[pos].position--;
            $scope.iCol.setImages[pos - 1].position++;
        }
        $scope.iCol.setImages = $scope.iCol.setImages.sort(function (a, b) {
            return a.position - b.position;
        }).filter(img => img.isActive === true);
        // $state.go("app.sets_edit");
    };

    $scope.ImageOrderDown = function (pos) {
        if (pos >= 0 && pos < $scope.iCol.setImages.length - 1) {
            $scope.iCol.setImages[pos].position++;
            $scope.iCol.setImages[pos + 1].position--;
        }
        $scope.iCol.setImages = $scope.iCol.setImages.sort(function (a, b) {
            return a.position - b.position;
        }).filter(img => img.isActive === true);

        // $state.go("app.sets_edit");
    };

    $scope.Delete = function (pos) {
        $scope.iCol.setImages[pos].isActive = false;
        $scope.iCol.delImages.push($scope.iCol.setImages[pos]);
        $scope.iCol.setImages.splice(pos, 1);

        //$scope.iCol.setImages[pos].isActive = false;
        // $scope.iCol.setImages = $scope.iCol.setImages.sort(function (a, b) {
        //     return a.position - b.position;
        // }).filter(img => img.isActive === true);

        $scope.iCol.setImages.forEach(function (image, index) {
            $scope.iCol.setImages[index].position = index;
        });

        //Jos : replace these #state.go's with single $compile
    };


}

angular
    .module('inspinia')
    .controller('SetEditCtrl', SetEditCtrl);