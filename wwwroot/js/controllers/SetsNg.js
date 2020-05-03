function SetsNgCtrl($scope, $state, updateImage, $sessionStorage, $localStorage, getSetsSrvNg, passData, getSetSrv, $timeout, $q) {
    //if ($sessionStorage.User === undefined) {
    //    $state.go("logins");
    //}

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
        //minDate: 'minDate',
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
    if ($sessionStorage.album === undefined) {
        $sessionStorage.album = $state.params.album;
    }
    else if ($sessionStorage.album === null) {/* #####!!!!!!!!!*/
        $sessionStorage.album = 0;
    }

    if ($sessionStorage.dtMin === undefined) {
        $sessionStorage.dtMin = new Date($sessionStorage.album.startDate);
    }

    if ($sessionStorage.dtMax === undefined) {
        $sessionStorage.dtMax = new Date($sessionStorage.album.endDate);
    }

    if ($sessionStorage.yrStartSel === undefined) {
        $sessionStorage.yrStartSel = $sessionStorage.dtMin;
    }

    if ($sessionStorage.yrEndSel === undefined) {
        $sessionStorage.yrEndSel = $sessionStorage.dtMax;
    }

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
                "Direction": "Ascending"
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

    

    //$sessionStorage.filterby = [
    //    {
    //        "Column": "Year",
    //        "Start": $sessionStorage.yrStartSel,
    //        "End": $sessionStorage.yrEndSel
    //    },
    //    {
    //        "Column": "Range",
    //        "Ranges": ["Kruggerrand"]
    //    },
    //    {
    //        "Column": "SetType",
    //        "SetType": ["All"]
    //    }
    //];


    if ($sessionStorage.filterbyRanges === undefined) $sessionStorage.filterbyRanges = ["Kruggerrand"];
    if ($sessionStorage.filterbyYear === undefined) $sessionStorage.filterbyYear = {
        "Start": $sessionStorage.album.startDate,
        "End": $sessionStorage.album.endDate
    };

    if ($sessionStorage.filterbySetTypes === undefined) $sessionStorage.filterbySetTypes = ["Coin"];

    $scope.pageSize = $localStorage.session_pglen;
    $scope.viewby = $localStorage.session_pglen;

    //$scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    if ($sessionStorage.currentPage === undefined) {
        $sessionStorage.currentPage = 1;
    }

    if ($sessionStorage.numberOfPages === undefined) {
        $sessionStorage.numberOfPages = 1;
    }

    $scope.setPage = function (pageNo) {
        $sessionStorage.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        $scope.getsets();
    };

    $scope.setItemsPerPage = function (num) {
        $localStorage.session_pglen = num;
        $sessionStorage.iColSets = undefined;
        $scope.getsets();
    };

    $scope.getsets = () => {

        getSetsSrvNg.update({
            start: ($sessionStorage.currentPage - 1) * $localStorage.session_pglen,
            length: $sessionStorage.currentPage * $localStorage.session_pglen,
            sortby: JSON.stringify($sessionStorage.sortby),
            filterbyYear: JSON.stringify($sessionStorage.filterbyYear),
            filterbyRanges: JSON.stringify($sessionStorage.filterbyRanges),
            filterbySetTypes: JSON.stringify($sessionStorage.filterbySetTypes),
            groupby: JSON.stringify($sessionStorage.groupby),
            albumId: $sessionStorage.album.albumId
        }).$promise.then(function (response) {
            $sessionStorage.iColSets = JSON.parse(JSON.stringify(response));
            //$scope.dtMin = new Date($sessionStorage.iColSets.yrstartmin);
            //$scope.dtMax = new Date($sessionStorage.iColSets.yrendmax);
            angular.forEach($sessionStorage.iColSets.data, function (set) {
                if (set.items.length > 0) {
                    set.delItems = set.items.filter(item => item.isActive === false);
                    set.items = set.items.sort(function (a, b) {
                        return a.position - b.position;
                    }).filter(item => item.isActive === true);
                }
            });
            $sessionStorage.numberOfPages = Math.ceil($sessionStorage.iColSets.recordsTotal / $localStorage.session_pglen);
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });

    };

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

    if ($sessionStorage.iColSets === undefined) {
        $scope.sortBy("Year");
    }

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
        $sessionStorage.filterbyYear.Start = $sessionStorage.yrStartSel;
        $sessionStorage.filterbyYear.End = $sessionStorage.yrEndSel;
        $scope.getsets();
    };

    $scope.selectSet = (event, setidx) => {
        var set = $sessionStorage.iColSets.data[setidx];
        getSetSrv.get({ id: set.setId }).$promise.then(function (response) { //we need to get full images from server
            set = JSON.parse(JSON.stringify(response));
            if (set.items.length > 0) {
                set.delItems = set.items.filter(item => item.isActive === false);
                set.items = set.items.sort(function (a, b) {
                    return a.position - b.position;
                }).filter(item => item.isActive === true);
            }
            $sessionStorage.curSetIdx = setidx;
            $sessionStorage.iColSets.data[setidx] = set;
            $state.go('app.set');
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    $scope.SelectItem = (event, setidx, itemidx, direction) => {
        var items = $sessionStorage.iColSets.data[setidx].items;
        var item = items[itemidx];

        if (itemidx === 0) {
            items.forEach(function (item) {
                if (item.userItems.length === 0) {
                    item.userItems.push({ userId: $sessionStorage.name, itemId: item.itemId, quantity: 0 });
                }
                item.userItems[0].quantity = item.userItems[0].quantity + direction;
            });
        } else {
            if (item.userItems.length === 0) {
                item.userItems.push({ userId: $sessionStorage.name, itemId: item.itemId, quantity: 0 });
            }
            item.userItems[0].quantity = item.userItems[0].quantity + direction;
        }  //0 here should be user find, do user filtering on api change entity []->{}

        $scope.entry = new updateImage($sessionStorage.iColSets.data[setidx]);
        $scope.entry.$update(function (response) {

        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    $scope.createSet = function (id) {
        if (id === undefined) {
            var iCol = new getSetSrv();
            iCol.setImages = [];
            iCol.delImages = [];
            //passData.set("Selected", iCol);
            $state.go('app.set');
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


