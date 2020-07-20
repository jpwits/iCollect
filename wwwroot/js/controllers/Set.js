function SetCtrl($window, $scope, $state, $stateParams, $sessionStorage, getSetsSrvNg, $q, updateSet) {

    $scope.dspCoins = false;
    $scope.dspObserves = false;

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

    if ($stateParams.setIdx === '-1') {
        var set = new getSetsSrvNg.set();
        set.setImages = [];
        set.delImages = [];
        set.setId = 0;
    }
    else {
        $scope.iSet = $sessionStorage.iColSets.data[$stateParams.setIdx];
    }

    if ($scope.iSet !== undefined) {
        getSetsSrvNg.coins($sessionStorage.User.token)
            .get({ year: $scope.iSet.year, type: $scope.iSet.setType, range: $scope.iSet.range })
            .$promise.then(function (response) { //we need to get full images from server
                $scope.rangeCoins = JSON.parse(JSON.stringify(response)).rangeCoins;
            }, function (error) {
                $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                alert("Error " + $sessionStorage.iComsErr.status + " Selecting Set : " + $sessionStorage.iComsErr.data);
            });
    }

    $scope.searchButtonText = "Save";

    $scope.UpdateSet = function (set) {
        if (set.setId === undefined) {
            set.setId = 0;
            set.year = set.date.getFullYear();
            set.catalogId = 1;
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

            $sessionStorage.iColSets.data[$stateParams.setIdx] = $scope.iSet;
            if ($scope.iSet.isActive === false) {
                $sessionStorage.iColSets.data.splice($stateParams.setIdx);
            }
            //alert("Saved successfully...");
            $scope.searchButtonText = "Save";
            $window.history.back();

        }, function (error) {
            $scope.searchButtonText = "Save";
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Retrieving Sets : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.uploadFiles = function (files) {
        files.forEach(function (file, index) {
            var fReader = new FileReader();
            fReader.readAsDataURL(file);
            fReader.onloadend = function (event) {
                var newItem = $scope.initSet(event);
                if ($scope.iSet.items === undefined) {
                    $scope.iSet.items = [];
                }

                if ($scope.iSet.items.length > 0) {
                    newItem.position = $scope.iSet.items[$scope.iSet.items.length - 1].position + 1;
                }
                newItem.linkedItem = false;
                
                $scope.$apply(function () {
                    $scope.iSet.items.push(newItem);
                });
                
                $(function () {
                    $('.selectpicker').selectpicker();
                });
                
            };
        });
    };

    $scope.initSet = function (event) {
        var type = event.target.result.split(';')[0].split(':')[1];

        return newItem = {
            itemId: 0,
            description: null,
            setId: $scope.iSet.setId,
            thumbnail: null,
            delImage: null,
            isActive: true,
            position: 0,
            type: null,
            denominator: null,
            mass: null,
            metalContent: null,
            dimension: null,
            weight: null,
            imageIdA: 0,
            imageIdB: null,
            thumbnailA: null,
            thumbnailB: null,
            priceEstimated: null,
            mintMark: null,
            imageIdANavigation: {
                imageId: 0,
                image: event.target.result.replace('data:' + type + ';base64,', ''),
                type: type,
            },
            imageIdBNavigation: null,
            userItems: [],
            linkedItem: true
        }
    }

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
        if ($scope.iSet.delItems === undefined) {
            $scope.iSet.delItems = [];
        }
        $scope.iSet.delItems.push($scope.iSet.items[pos]);
        $scope.iSet.items.splice(pos, 1);

        $scope.iSet.items.forEach(function (image, index) {
            $scope.iSet.items[index].position = index;
        });
    };

    $scope.DeleteSet = function (set) {
        if (confirm('Are you sure you want to delete this set?!!!')) {
            $scope.iSet.isActive = false;
            $scope.UpdateSet($scope.iSet);
            $scope.iSet.items.forEach(function (image, index) {
                $scope.iSet.items[index].isActive = false;
            });
        }
    };

    $scope.itemSelect = function (set) {
        $(function () {
            $('.selectpicker').selectpicker();
        });
    };

    $scope.showCoins = function (set) {
        $scope.dspCoins = !$scope.dspCoins;
    };

    $scope.linkCoin = function (sharedItem) {
        
        var clone = Object.assign({}, sharedItem);

        if ($scope.iSet.items === undefined) {
            $scope.iSet.items = [];
        }

        if ($scope.iSet.items.length > 0) {
            clone.position = $scope.iSet.items[$scope.iSet.items.length - 1].position + 1;
        }
        clone.linkedItem = true;
        clone.ItemId = 0;
        clone.setId = $scope.iSet.setId;
        $scope.iSet.items.push(clone);
        $(function () {
            $('.selectpicker').selectpicker();
        });
    };

    $scope.linkObverse = function (item, sharedItem) {
        item.imageIdB = sharedItem.imageIdB;
        item.imageIdBNavigation = {
            imageId: sharedItem.imageIdBNavigation.imageId,
            image: sharedItem.imageIdBNavigation.image,
            type: sharedItem.imageIdBNavigation.type
        };
        item.type = sharedItem.type;
        item.ThumbnailB = sharedItem.ThumbnailB;
        $(function () {
            $('.selectpicker').selectpicker();
        });
    };

    $scope.showObserves = function (set) {
        $scope.dspObserves = !$scope.dspObserves;
    };

    $(function () {
        $('.selectpicker').selectpicker();
    });
}

angular
    .module('inspinia')
    .controller('SetCtrl', SetCtrl);