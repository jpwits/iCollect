/*
 * INSPINIA - Responsive Admin Theme
 *
 * Main controller.js file
 * Define controllers with data used in Inspinia theme
 *
 *
 * Functions (controllers)
 *  - MainCtrl
 *  - dashboardFlotOne
 *  - dashboardFlotTwo
 *  - dashboardFlotFive
 *  - dashboardMap
 *  - flotChartCtrl
 *  - rickshawChartCtrl
 *  - sparklineChartCtrl
 *  - modalDemoCtrl
 *  - ionSlider
 *  - wizardCtrl
 *  - CalendarCtrl
 *  - GoogleMaps
 *  - ngGridCtrl
 *  - codeEditorCtrl
 *  - nestableCtrl
 *  - notifyCtrl
 *  - translateCtrl
 *  - imageCrop
 *  - diff
 *  - idleTimer
 *  - liveFavicon
 *  - formValidation
 *  - agileBoard
 *  - draggablePanels
 *  - chartistCtrl
 *  - metricsCtrl
 *  - sweetAlertCtrl
 *  - selectCtrl
 *  - toastrCtrl
 *  - loadingCtrl
 *  - datatablesCtrl
 *  - truncateCtrl
 *  - touchspinCtrl
 *  - tourCtrl
 *  - jstreeCtrl
 *  - datamapsCtrl
 *  - pdfCtrl
 *  - passwordMeterCtrl
 *
 *
 */
//var vm = this;
/*
 * MainCtrl - controller
 * Contains several global data used in different view
 *
 */


/*
 * dashboardFlotOne - simple controller for data
 * for Flot chart in Dashboard view
 */
function dashboardFlotOne() {

    var data1 = [
        [0, 4],
        [1, 8],
        [2, 5],
        [3, 10],
        [4, 4],
        [5, 16],
        [6, 5],
        [7, 11],
        [8, 6],
        [9, 11],
        [10, 30],
        [11, 10],
        [12, 13],
        [13, 4],
        [14, 3],
        [15, 3],
        [16, 6]
    ];
    var data2 = [
        [0, 1],
        [1, 0],
        [2, 2],
        [3, 0],
        [4, 1],
        [5, 3],
        [6, 1],
        [7, 5],
        [8, 2],
        [9, 3],
        [10, 2],
        [11, 1],
        [12, 0],
        [13, 2],
        [14, 8],
        [15, 0],
        [16, 0]
    ];

    var options = {
        series: {
            lines: {
                show: false,
                fill: true
            },
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 1,
                fill: 0.4
            },
            points: {
                radius: 0,
                show: true
            },
            shadowSize: 2,
            grow: { stepMode: "linear", stepDirection: "up", steps: 80 }
        },
        grow: { stepMode: "linear", stepDirection: "up", steps: 80 },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 1,
            color: '#d5d5d5'
        },
        colors: ["#1ab394", "#1C84C6"],
        xaxis: {
        },
        yaxis: {
            ticks: 4
        },
        tooltip: false
    };

    /*
     * Definition of variables
     * Flot chart
     */
    this.flotData = [data1, data2];
    this.flotOptions = options;
}

/*
 * dashboardFlotTwo - simple controller for data
 * for Flot chart in Dashboard view
 */
function dashboardFlotTwo() {

    var data1 = [
        [gd(2012, 1, 1), 7],
        [gd(2012, 1, 2), 6],
        [gd(2012, 1, 3), 4],
        [gd(2012, 1, 4), 8],
        [gd(2012, 1, 5), 9],
        [gd(2012, 1, 6), 7],
        [gd(2012, 1, 7), 5],
        [gd(2012, 1, 8), 4],
        [gd(2012, 1, 9), 7],
        [gd(2012, 1, 10), 8],
        [gd(2012, 1, 11), 9],
        [gd(2012, 1, 12), 6],
        [gd(2012, 1, 13), 4],
        [gd(2012, 1, 14), 5],
        [gd(2012, 1, 15), 11],
        [gd(2012, 1, 16), 8],
        [gd(2012, 1, 17), 8],
        [gd(2012, 1, 18), 11],
        [gd(2012, 1, 19), 11],
        [gd(2012, 1, 20), 6],
        [gd(2012, 1, 21), 6],
        [gd(2012, 1, 22), 8],
        [gd(2012, 1, 23), 11],
        [gd(2012, 1, 24), 13],
        [gd(2012, 1, 25), 7],
        [gd(2012, 1, 26), 9],
        [gd(2012, 1, 27), 9],
        [gd(2012, 1, 28), 8],
        [gd(2012, 1, 29), 5],
        [gd(2012, 1, 30), 8],
        [gd(2012, 1, 31), 25]
    ];

    var data2 = [
        [gd(2012, 1, 1), 800],
        [gd(2012, 1, 2), 500],
        [gd(2012, 1, 3), 600],
        [gd(2012, 1, 4), 700],
        [gd(2012, 1, 5), 500],
        [gd(2012, 1, 6), 456],
        [gd(2012, 1, 7), 800],
        [gd(2012, 1, 8), 589],
        [gd(2012, 1, 9), 467],
        [gd(2012, 1, 10), 876],
        [gd(2012, 1, 11), 689],
        [gd(2012, 1, 12), 700],
        [gd(2012, 1, 13), 500],
        [gd(2012, 1, 14), 600],
        [gd(2012, 1, 15), 700],
        [gd(2012, 1, 16), 786],
        [gd(2012, 1, 17), 345],
        [gd(2012, 1, 18), 888],
        [gd(2012, 1, 19), 888],
        [gd(2012, 1, 20), 888],
        [gd(2012, 1, 21), 987],
        [gd(2012, 1, 22), 444],
        [gd(2012, 1, 23), 999],
        [gd(2012, 1, 24), 567],
        [gd(2012, 1, 25), 786],
        [gd(2012, 1, 26), 666],
        [gd(2012, 1, 27), 888],
        [gd(2012, 1, 28), 900],
        [gd(2012, 1, 29), 178],
        [gd(2012, 1, 30), 555],
        [gd(2012, 1, 31), 993]
    ];


    var dataset = [
        {
            label: "Number of orders",
            grow: { stepMode: "linear" },
            data: data2,
            color: "#1ab394",
            bars: {
                show: true,
                align: "center",
                barWidth: 24 * 60 * 60 * 600,
                lineWidth: 0
            }

        },
        {
            label: "Payments",
            grow: { stepMode: "linear" },
            data: data1,
            yaxis: 2,
            color: "#1C84C6",
            lines: {
                lineWidth: 1,
                show: true,
                fill: true,
                fillColor: {
                    colors: [
                        {
                            opacity: 0.2
                        },
                        {
                            opacity: 0.2
                        }
                    ]
                }
            }
        }
    ];


    var options = {
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 0,
            color: '#d5d5d5'
        },
        colors: ["#1ab394", "#464f88"],
        tooltip: true,
        xaxis: {
            mode: "time",
            tickSize: [3, "day"],
            tickLength: 0,
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 10,
            color: "#d5d5d5"
        },
        yaxes: [
            {
                position: "left",
                max: 1070,
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 3
            },
            {
                position: "right",
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: ' Arial',
                axisLabelPadding: 67
            }
        ],
        legend: {
            noColumns: 1,
            labelBoxBorderColor: "#d5d5d5",
            position: "nw"
        }

    };

    function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
    }

    /*
     * Definition of variables
     * Flot chart
     */
    this.flotData = dataset;
    this.flotOptions = options;
}

/*
 * dashboardFlotFive - simple controller for data
 * for Flot chart in Dashboard view
 */
function dashboardFive() {

    var data1 = [
        [0, 4], [1, 8], [2, 5], [3, 10], [4, 4], [5, 16], [6, 5], [7, 11], [8, 6], [9, 11], [10, 20], [11, 10], [12, 13], [13, 4], [14, 7], [15, 8], [16, 12]
    ];
    var data2 = [
        [0, 0], [1, 2], [2, 7], [3, 4], [4, 11], [5, 4], [6, 2], [7, 5], [8, 11], [9, 5], [10, 4], [11, 1], [12, 5], [13, 2], [14, 5], [15, 2], [16, 0]
    ];

    var options = {
        series: {
            lines: {
                show: false,
                fill: true
            },
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 1,
                fill: 0.4
            },
            points: {
                radius: 0,
                show: true
            },
            shadowSize: 2
        },
        grid: {
            hoverable: true,
            clickable: true,

            borderWidth: 2,
            color: 'transparent'
        },
        colors: ["#1ab394", "#1C84C6"],
        xaxis: {
        },
        yaxis: {
        },
        tooltip: false
    };

    /*
     * Definition of variables
     * Flot chart
     */
    this.flotData = [data1, data2];
    this.flotOptions = options;


    var sparkline1Data = [34, 43, 43, 35, 44, 32, 44, 52];
    var sparkline1Options = {
        type: 'line',
        width: '100%',
        height: '50',
        lineColor: '#1ab394',
        fillColor: "transparent"
    };

    var sparkline2Data = [32, 11, 25, 37, 41, 32, 34, 42];
    var sparkline2Options = {
        type: 'line',
        width: '100%',
        height: '50',
        lineColor: '#1ab394',
        fillColor: "transparent"
    };

    this.sparkline1 = sparkline1Data;
    this.sparkline1Options = sparkline1Options;
    this.sparkline2 = sparkline2Data;
    this.sparkline2Options = sparkline2Options;

}


/*
 * dashboardMap - data for Map plugin
 * used in Dashboard 2 view
 */

function dashboardMap() {
    var data = {
        "US": 298,
        "SA": 200,
        "DE": 220,
        "FR": 540,
        "CN": 120,
        "AU": 760,
        "BR": 550,
        "IN": 200,
        "GB": 120
    };

    this.data = data;
}

/*
 * flotChartCtrl - Controller for data for All flot chart
 * used in Flot chart view
 */


function toastrCtrl($scope, toaster) {

    $scope.demo1 = function () {
        toaster.success({ body: "Hi, welcome to Inspinia. This is example of Toastr notification box." });
    };

    $scope.demo2 = function () {
        toaster.warning({ title: "Title example", body: "This is example of Toastr notification box." });
    };

    $scope.demo3 = function () {
        toaster.pop({
            type: 'info',
            title: 'Title example',
            body: 'This is example of Toastr notification box.',
            showCloseButton: true

        });
    };

    $scope.demo4 = function () {
        toaster.pop({
            type: 'error',
            title: 'Title example',
            body: 'This is example of Toastr notification box.',
            showCloseButton: true,
            timeout: 600
        });
    };

}

function loadingCtrl($scope, $timeout) {


    $scope.runLoading = function () {
        // start loading
        $scope.loading = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading = false;
        }, 2000)
    };


    // Demo purpose actions
    $scope.runLoading1 = function () {
        // start loading
        $scope.loading1 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading1 = false;
        }, 2000)
    };
    $scope.runLoading2 = function () {
        // start loading
        $scope.loading2 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading2 = false;
        }, 2000)
    };
    $scope.runLoading3 = function () {
        // start loading
        $scope.loading3 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading3 = false;
        }, 2000)
    };
    $scope.runLoading4 = function () {
        // start loading
        $scope.loading4 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading4 = false;
        }, 2000)
    };
    $scope.runLoading5 = function () {
        // start loading
        $scope.loading5 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading5 = false;
        }, 2000)
    };
    $scope.runLoading6 = function () {
        // start loading
        $scope.loading6 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading6 = false;
        }, 2000)
    };
    $scope.runLoading7 = function () {
        // start loading
        $scope.loading7 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading7 = false;
        }, 2000)
    };
    $scope.runLoading8 = function () {
        // start loading
        $scope.loading8 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading8 = false;
        }, 2000)
    };
    $scope.runLoading9 = function () {
        // start loading
        $scope.loading9 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading9 = false;
        }, 2000)
    };
    $scope.runLoading10 = function () {
        // start loading
        $scope.loading10 = true;

        $timeout(function () {
            // Simulate some service
            $scope.loading10 = false;
        }, 2000)
    };
    $scope.runLoading11 = function () {
        // start loading
        $timeout(function () {
            $scope.loading11 = 0.1;
        }, 500);
        $timeout(function () {
            $scope.loading11 += 0.2;
        }, 1000);
        $timeout(function () {
            $scope.loading11 += 0.3;
        }, 1500);
        $timeout(function () {
            $scope.loading11 = false;
        }, 2000);

    };
    $scope.runLoading12 = function () {
        // start loading
        $timeout(function () {
            $scope.loading12 = 0.1;
        }, 500);
        $timeout(function () {
            $scope.loading12 += 0.2;
        }, 1000);
        $timeout(function () {
            $scope.loading12 += 0.3;
        }, 1500);
        $timeout(function () {
            $scope.loading12 = false;
        }, 2000);

    };

    $scope.runLoadingDemo = function () {
        // start loading
        $scope.loadingDemo = true;

        $timeout(function () {
            // Simulate some service
            $scope.loadingDemo = false;
        }, 2000);
    };


}

function truncateCtrl($scope) {

    $scope.truncateOptions = {
        watch: 'window'
    };

    $scope.truncateOptions2 = {
        watch: 'window',
        ellipsis: ' ///...'
    };

    $scope.truncateOptions3 = {
        watch: 'window',
        wrap: 'letter'
    }

}

function touchspinCtrl($scope) {

    $scope.inputteresxcs = 55;
    $scope.spinOption1 = {
        min: 0,
        max: 100,
        step: 0.1,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
    };

    $scope.spinOption2 = {
        verticalbuttons: true
    }

    $scope.spinOption3 = {
        postfix: '%'
    }

    $scope.spinOption4 = {
        postfix: "a button",
        postfix_extraclass: "btn btn-default"
    }

}

function tourCtrl($scope) {

    $scope.preparebody = function (tour) {
        $('body').addClass('tour-open')
    };

    $scope.clearbody = function (tour) {
        $('body').removeClass('tour-close')
    }

}

function jstreeCtrl($scope) {

    $scope.treeConfig = {
        'plugins': ['types', 'dnd'],
        'types': {
            'default': {
                'icon': 'fa fa-folder'
            },
            'html': {
                'icon': 'fa fa-file-code-o'
            },
            'svg': {
                'icon': 'fa fa-file-picture-o'
            },
            'css': {
                'icon': 'fa fa-file-code-o'
            },
            'img': {
                'icon': 'fa fa-file-image-o'
            },
            'js': {
                'icon': 'fa fa-file-text-o'
            }

        }
    };

    $scope.treeData = [
        {
            "id": "ajson1",
            "parent": "#",
            "text": "Admin theme",
            "state": {
                "opened": true
            },
            "__uiNodeId": 1
        }, {
            "id": "ajson2",
            "parent": "ajson1",
            "text": "css",
            "state": {
                "opened": true
            },
            "__uiNodeId": 2
        }, {
            "id": "ajson3",
            "parent": "ajson2",
            "text": "animate.css",
            "state": {
                "opened": true
            },
            "type": "css",
            "__uiNodeId": 3
        },
        {
            "id": "ajson4",
            "parent": "ajson2",
            "text": "bootstrap.css",
            "state": {
                "opened": true
            },
            "type": "css",
            "__uiNodeId": 4
        },
        {
            "id": "ajson5",
            "parent": "ajson2",
            "text": "style.css",
            "state": {
                "opened": true
            },
            "type": "css",
            "__uiNodeId": 5
        },
        {
            "id": "ajson6",
            "parent": "ajson1",
            "text": "fonts",
            "state": {
                "opened": false
            },
            "__uiNodeId": 6
        },
        {
            "id": "ajson9",
            "parent": "ajson6",
            "text": "glyphicons-halflings-regular.eot",
            "state": {
                "opened": true
            },
            "type": "img",
            "__uiNodeId": 9
        },
        {
            "id": "ajson10",
            "parent": "ajson6",
            "text": "glyphicons-halflings-regular.svg",
            "state": {
                "opened": true
            },
            "type": "svg",
            "__uiNodeId": 10
        },
        {
            "id": "ajson11",
            "parent": "ajson6",
            "text": "glyphicons-halflings-regular.ttf",
            "state": {
                "opened": true
            },
            "type": "img",
            "__uiNodeId": 11
        },
        {
            "id": "ajson12",
            "parent": "ajson6",
            "text": "glyphicons-halflings-regular.woff",
            "state": {
                "opened": true
            },
            "type": "img",
            "__uiNodeId": 12
        },
        {
            "id": "ajson7",
            "parent": "ajson1",
            "text": "img",
            "state": {
                "opened": true
            },
            "__uiNodeId": 7
        },
        {
            "id": "ajson13",
            "parent": "ajson7",
            "text": "profile_small.jpg",
            "state": {
                "opened": true
            },
            "type": "img",
            "__uiNodeId": 13
        },
        {
            "id": "ajson14",
            "parent": "ajson7",
            "text": "angular_logo.png",
            "state": {
                "opened": true
            },
            "type": "img",
            "__uiNodeId": 14
        },
        {
            "id": "ajson15",
            "parent": "ajson7",
            "text": "html_logo.png",
            "state": {
                "opened": true
            },
            "li_attr": { "class": "text-navy" },
            "type": "img",
            "__uiNodeId": 15
        },
        {
            "id": "ajson16",
            "parent": "ajson7",
            "text": "mvc_logo.png",
            "state": {
                "opened": true
            },
            "li_attr": { "class": "text-navy" },
            "type": "img",
            "__uiNodeId": 16
        },
        {
            "id": "ajson8",
            "parent": "ajson1",
            "text": "js",
            "state": {
                "opened": true
            },
            "__uiNodeId": 8
        },
        {
            "id": "ajson17",
            "parent": "ajson8",
            "text": "inspinia.js",
            "state": {
                "opened": true
            },
            "type": "js",
            "__uiNodeId": 17
        },
        {
            "id": "ajson18",
            "parent": "ajson8",
            "text": "bootstrap.js",
            "state": {
                "opened": true
            },
            "type": "js",
            "__uiNodeId": 18
        },
        {
            "id": "ajson19",
            "parent": "ajson8",
            "text": "jquery-2.1.1.js",
            "state": {
                "opened": true
            },
            "type": "js",
            "__uiNodeId": 19
        },
        {
            "id": "ajson20",
            "parent": "ajson8",
            "text": "jquery-ui.custom.min.js",
            "state": {
                "opened": true
            },
            "type": "js",
            "__uiNodeId": 20
        },
        {
            "id": "ajson21",
            "parent": "ajson1",
            "text": "affix.html",
            "type": "html",
            "__uiNodeId": 21
        },
        {
            "id": "ajson22",
            "parent": "ajson1",
            "text": "dashboard.html",
            "type": "html",
            "__uiNodeId": 22
        },
        {
            "id": "ajson23",
            "parent": "ajson1",
            "text": "buttons.html",
            "type": "html",
            "__uiNodeId": 23
        },
        {
            "id": "ajson24",
            "parent": "ajson1",
            "text": "calendar.html",
            "type": "html",
            "__uiNodeId": 24
        },
        {
            "id": "ajson25",
            "parent": "ajson1",
            "text": "contacts.html",
            "type": "html",
            "__uiNodeId": 25
        },
        {
            "id": "ajson26",
            "parent": "ajson1",
            "text": "css_animation.html",
            "type": "html",
            "__uiNodeId": 26
        },
        {
            "id": "ajson27",
            "parent": "ajson1",
            "text": "flot_chart.html",
            "type": "html",
            "__uiNodeId": 27
        },
        {
            "id": "ajson28",
            "parent": "ajson1",
            "text": "google_maps.html",
            "type": "html",
            "__uiNodeId": 28
        },
        {
            "id": "ajson29",
            "parent": "ajson1",
            "text": "icons.html",
            "type": "html",
            "__uiNodeId": 29
        },
        {
            "id": "ajson30",
            "parent": "ajson1",
            "text": "invoice.html",
            "type": "html",
            "__uiNodeId": 30
        },
        {
            "id": "ajson31",
            "parent": "ajson1",
            "text": "login.html",
            "type": "html",
            "__uiNodeId": 31
        }
    ]

}

function datamapsCtrl($scope) {

    $scope.mapObject1 = {
        scope: 'world',
        responsive: true,
        fills: {
            defaultFill: "#DBDAD6"
        },
        geographyConfig: {
            highlightFillColor: '#1C977A',
            highlightBorderWidth: 0,
        },
    }

    $scope.mapObject2 = {
        scope: 'world',
        responsive: true,
        fills: {
            defaultFill: "#DBDAD6",
            active: "#2BA587"
        },
        geographyConfig: {
            highlightFillColor: '#1C977A',
            highlightBorderWidth: 0,
        },
        data: {
            USA: { fillKey: "active" },
            RUS: { fillKey: "active" },
            DEU: { fillKey: "active" },
            BRA: { fillKey: "active" }
        }
    }

    $scope.mapObject3 = {
        responsive: true,
        scope: 'usa',
        fills: {
            defaultFill: "#DBDAD6",
            active: "#2BA587"
        },
        geographyConfig: {
            highlightFillColor: '#1C977A',
            highlightBorderWidth: 0
        },
        data: {
            NE: { fillKey: "active" },
            CA: { fillKey: "active" },
            NY: { fillKey: "active" },
        }
    }

    $scope.mapObject4 = {
        scope: 'world',
        responsive: true,
        fills: {
            defaultFill: "#F2F2F0",
            active: "#DBDAD6",
            usa: "#269479"
        },
        geographyConfig: {
            highlightFillColor: '#1C977A',
            highlightBorderWidth: 0
        },
        data: {
            USA: { fillKey: "usa" },
            RUS: { fillKey: "active" },
            DEU: { fillKey: "active" },
            POL: { fillKey: "active" },
            JAP: { fillKey: "active" },
            AUS: { fillKey: "active" },
            BRA: { fillKey: "active" }
        }
    };

    $scope.mapPlugins = {
        arc: {}
    };

    $scope.mapPluginData = {
        arc: [
            { origin: 'USA', destination: 'RUS' },
            { origin: 'USA', destination: 'DEU' },
            { origin: 'USA', destination: 'POL' },
            { origin: 'USA', destination: 'JAP' },
            { origin: 'USA', destination: 'AUS' },
            { origin: 'USA', destination: 'BRA' }
        ]
    }



}

function pdfCtrl($scope) {
    $scope.pdfUrl = './pdf/example.pdf';
    $scope.httpHeaders = { Authorization: 'Bearer some-aleatory-token' };
}

function passwordMeterCtrl($scope) {

    var options1 = {};
    options1.ui = {
        container: "#pwd-container1",
        showVerdictsInsideProgressBar: true,
        viewports: {
            progress: ".pwstrength_viewport_progress"
        }
    };
    options1.common = {
        debug: false,
    };
    $scope.option1 = options1;

    var options2 = {};
    options2.ui = {
        container: "#pwd-container2",
        showStatus: true,
        showProgressBar: false,
        viewports: {
            verdict: ".pwstrength_viewport_verdict"
        }
    };
    $scope.option2 = options2;

    var options3 = {};
    options3.ui = {
        container: "#pwd-container3",
        showVerdictsInsideProgressBar: true,
        viewports: {
            progress: ".pwstrength_viewport_progress2"
        }
    };
    options3.common = {
        debug: true,
        usernameField: "#username"
    };
    $scope.option3 = options3;

    var options4 = {};
    options4.ui = {
        container: "#pwd-container4",
        viewports: {
            progress: ".pwstrength_viewport_progress4",
            verdict: ".pwstrength_viewport_verdict4"
        }
    };
    options4.common = {
        zxcvbn: true,
        zxcvbnTerms: ['samurai', 'shogun', 'bushido', 'daisho', 'seppuku'],
        userInputs: ['#year', '#familyname']
    };
    $scope.option4 = options4;



}
/*
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .controller('dashboardFlotOne', dashboardFlotOne)
    .controller('dashboardFlotTwo', dashboardFlotTwo)
    .controller('dashboardFive', dashboardFive)
    .controller('dashboardMap', dashboardMap)
    .controller('toastrCtrl', toastrCtrl)
    .controller('loadingCtrl', loadingCtrl)
    .controller('truncateCtrl', truncateCtrl)
    .controller('touchspinCtrl', touchspinCtrl)
    .controller('tourCtrl', tourCtrl)
    .controller('jstreeCtrl', jstreeCtrl)
    .controller('datamapsCtrl', datamapsCtrl)
    .controller('pdfCtrl', pdfCtrl)
    .controller('passwordMeterCtrl', passwordMeterCtrl);


