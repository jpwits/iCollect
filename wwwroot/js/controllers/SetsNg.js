function SetsNgCtrl($scope, $state, $stateParams, $sessionStorage, $localStorage, getSetsSrvNg, $timeout, $q, updateSet) {
    //$sessionStorage.newSet = false;

    $scope.spinLoadingSets = false;

    if ($state.params.viewLayout !== null) {
        $sessionStorage.viewLayout = $state.params.viewLayout;
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
    //$scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.altInputFormats = ['yyyy-M!-d!'];
    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };
    if ($sessionStorage.collection === undefined) {
        $sessionStorage.collection = $state.params.collection;
    }

    else if ($sessionStorage.collection === null) {/* #####!!!!!!!!!*/
        $sessionStorage.collection = 0;
    }

    if ($sessionStorage.filterbyYear === undefined) $sessionStorage.filterbyYear = {
        "Start": $sessionStorage.collection.startDate,
        "End": $sessionStorage.collection.endDate
    };

    $scope.yrStartSel = new Date($sessionStorage.filterbyYear.Start);
    $scope.yrEndSel = new Date($sessionStorage.filterbyYear.End);

    if ($localStorage.session_pglen === undefined) {
        $localStorage.session_pglen = "50";
    }

    $sessionStorage.sortby = {
        "Active": "Year",
        "Columns": [
            {
                "Column": "Description",
                "Direction": "Descending"
            }, {
                "Column": "Year",
                "Direction": "Descending"
            }, {
                "Column": "Range",
                "Direction": "Descending"
            }, {
                "Column": "SetType",
                "Direction": "Descending"
            }]
    };

    $sessionStorage.groupby = [{
        "Column": "Range",
        "Ranges": []
        //[{ "Name": "Protea", "isChecked": true },
        //{ "Name": "Kruggerrand", "isChecked": true }]   
    }, {
        "Column": "Type",
        "Types": ["Prestige", "Launch", "Special"]
    }];

    if ($sessionStorage.filterbyRanges === undefined) {
        $sessionStorage.filterbyRanges = [];
        $localStorage.lookups.rangeGroup.forEach(function (range) {
            $sessionStorage.filterbyRanges.push(range.key);
        });
    };
    if ($sessionStorage.filterbySetTypes === undefined) {
        $sessionStorage.filterbySetTypes = [];
        $localStorage.lookups.typeGroup.forEach(function (type) {
            $sessionStorage.filterbySetTypes.push(type.key);
        });
    }

    $scope.pageSize = $localStorage.session_pglen;
    $scope.viewby = $localStorage.session_pglen;
    $scope.maxSize = 5; //Number of pager buttons to show

    if ($sessionStorage.currentPage === undefined) {
        $sessionStorage.currentPage = 1;
    }

    if ($sessionStorage.numberOfPages === undefined) {
        $sessionStorage.numberOfPages = 1;
    }

    $scope.getsets = () => {
        if ($sessionStorage.User === undefined) {
            $state.go("logins");
            return;
        }
        var currentfilterbyRanges = $sessionStorage.filterbyRanges;
        if ($sessionStorage.filterbyRanges.length === $localStorage.lookups.rangeGroup.length) {
            currentfilterbyRanges = ["All"];
        }

        var currentfilterbySetTypes = $sessionStorage.filterbySetTypes;
        if ($sessionStorage.filterbySetTypes.length === $localStorage.lookups.typeGroup.length) {
            currentfilterbySetTypes = ["All"];
        }

        $scope.spinLoadingSets = true;
        getSetsSrvNg.sets($sessionStorage.User.token).update({
            start: ($sessionStorage.currentPage - 1) * $localStorage.session_pglen,
            length: $sessionStorage.currentPage * $localStorage.session_pglen,
            sortby: JSON.stringify($sessionStorage.sortby),
            filterbyYear: JSON.stringify($sessionStorage.filterbyYear),
            filterbyRanges: JSON.stringify(currentfilterbyRanges),
            filterbySetTypes: JSON.stringify(currentfilterbySetTypes),
            groupby: JSON.stringify($sessionStorage.groupby),
            collectionId: $sessionStorage.collection.collectionId
        }).$promise.then(function (response) {
            $sessionStorage.iColSets = JSON.parse(JSON.stringify(response));
            $scope.dtMin = new Date($sessionStorage.iColSets.yrstartmin);
            $scope.dtMax = new Date($sessionStorage.iColSets.yrendmax);
            angular.forEach($sessionStorage.iColSets.data, function (set) {
                if (set.items.length > 0) {
                    set.delItems = set.items.filter(item => item.isActive === false);
                    set.items = set.items.sort(function (a, b) {
                        return a.position - b.position;
                    }).filter(item => item.isActive === true);
                    set.coinList = "";
                    //if (set.setType === "SingleCoin") {
                        angular.forEach(set.items, function (item) {
                            if (item.type === "Coin") {
                                set.singleDenominator =  item.denominator 
                                set.singleWeight = item.weight
                                set.singleMetalContent = item.metalContent;
                                set.singleMintMark = item.mintMark;
                            }
                        })
                    //}
                }
            });
            $sessionStorage.numberOfPages = Math.ceil($sessionStorage.iColSets.recordsTotal / $localStorage.session_pglen);
            $scope.spinLoadingSets = false;
        }, function (error) {
            $scope.spinLoadingSets = false;
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Retrieving Sets : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.setItemsPerPage = function (num) {
        $localStorage.session_pglen = num;
        $sessionStorage.iColSets = undefined;
        $scope.getsets();
    };

    if ($sessionStorage.iColSets === undefined) {
        $scope.getsets();
    }

    $scope.sortBy = function (column) {
        var sortCol = $sessionStorage.sortby.Columns.find(a => a.Column === column);
        if (sortCol.Direction === "Ascending") {
            sortCol.Direction = "Descending";
        }
        else {
            sortCol.Direction = "Ascending";
        }
        $sessionStorage.sortby.Active = column;
        $scope.getsets();
    };

    $scope.filterRangeChange = (event) => {
        $sessionStorage.filterbyRanges = event;
        $scope.getsets();
    };

    $scope.filterTypeChange = (event) => {
        $sessionStorage.filterbySetTypes = event;
        $scope.getsets();
    };

    $scope.filterDate = () => {
        var ftrYear = $sessionStorage.filterbyYear;
        $sessionStorage.filterbyYear.Start = $scope.yrStartSel;
        $sessionStorage.filterbyYear.End = $scope.yrEndSel;
        $scope.getsets();
    };

    $scope.pageChanged = function () {
        $scope.getsets();
    };

    $scope.selectSet = (event, setidx) => {
        if ($sessionStorage.User === undefined) {
            $state.go("logins");
            return;
        }

        var curset = $sessionStorage.iColSets.data[setidx];
        var singleDenominator = curset.singleDenominator;
        var singleMetalContent = curset.singleMetalContent;
        var singleWeight = curset.singleWeight;
        var singleMintMark = curset.singleMintMark;
        getSetsSrvNg.set($sessionStorage.User.token).get({ id: curset.setId }).$promise.then(function (response) { //we need to get full images from server
            set = JSON.parse(JSON.stringify(response));
            set.singleDenominator = singleDenominator;
            set.singleMetalContent = singleMetalContent;
            set.singleWeight = singleWeight;
            set.singleMintMark = singleMintMark;

            if (set.items.length > 0) {
                set.delItems = set.items.filter(item => item.isActive === false);
                set.items = set.items.sort(function (a, b) {
                    return a.position - b.position;
                }).filter(item => item.isActive === true);
            }
            //$sessionStorage.curSetIdx = setidx;
            $sessionStorage.iColSets.data[setidx] = set;
            $state.go('app.set', { setIdx: setidx });
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Selecting Set : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.SelectItem = (event, setidx, itemidx, direction) => {
        var items = $sessionStorage.iColSets.data[setidx].items;
        var item = items[itemidx];

        if (itemidx === 0) {
            items.forEach(function (item) {
                if (item.userItems.length === 0) {
                    item.userItems.push({ userId: $sessionStorage.User.name, itemId: item.itemId, quantity: 0 });
                }
                item.userItems[0].quantity = item.userItems[0].quantity + direction;
            });
        } else {
            if (item.userItems.length === 0) {
                item.userItems.push({ userId: $sessionStorage.User.name, itemId: item.itemId, quantity: 0 });
            }
            item.userItems[0].quantity = item.userItems[0].quantity + direction;
        }  //0 here should be user find, do user filtering on api change entity []->{}

        $scope.entry = new updateSet($sessionStorage.iColSets.data[setidx]);
        $scope.entry.$update(function (response) {

        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Selecting Item : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.HaveSet = function (set) {
        var ret = false;
        if (set.items[0].userItems[0] !== undefined) {
            if (set.items[0].userItems[0].quantity !== undefined) {
                if (set.items[0].userItems[0].quantity > 0) {
                    ret = true;
                }
            }
        }
        return ret;
    }

    $scope.createSet = function (id) {
        if (id === undefined) {
            $state.go('app.set', { setId: -1 });
        }
    };

    $(function () {
        $('.selectpicker').selectpicker();
    });

}

angular
    .module('inspinia')
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        };
    })
    //.controller('PaginationDemoCtrl', PaginationDemoCtrl)
    .controller('SetsNgCtrl', SetsNgCtrl);


