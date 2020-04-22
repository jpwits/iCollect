function AlbumCtrl($scope, $state, passData, getLookups) {
    $scope.User = passData.get("User");

    $scope.rangeGroup = passData.get("$scope.rangeGroup");
    $scope.typeGroup = passData.get("$scope.typeGroup");

    $scope.fillLookups = () => {
        getLookups.get().$promise.then(function (response) {
            var Lookups = JSON.parse(JSON.stringify(response));
            $scope.rangeGroup = Lookups.rangeGroup;
            $scope.typeGroup = Lookups.typeGroup;
            $(function () {
                $('.selectpicker').selectpicker();
            });
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    if ($scope.rangeGroup === undefined || $scope.typeGroup === undefined) {
        $scope.fillLookups();
    }

    $scope.today = function () {
        $scope.dtStart = new Date(1987, 1, 1);
        $scope.dtEnd = new Date(2020, 1, 1);
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        datepickerMode: 'year',
        minMode: 'year',
        minDate: 'minDate',
        showWeeks: 'false',
        dateDisabled: disabled,
        formatYear: 'yyyy',
        maxDate: new Date(2020, 5, 22),
        //minDate: new Date(),
        startingDay: 1,
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.formats = ['yyyy'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    
}
angular
    .module('inspinia')
    .controller('AlbumCtrl', AlbumCtrl);
