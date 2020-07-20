
function CatalogsCtrl($scope, $state, DTOptionsBuilder, DTColumnBuilder, $compile, $templateCache, getCatalogSrv, passData, $timeout) {
    $scope.catalog_pglen = passData.get("catalog_pglen");
    if ($scope.catalog_pglen === undefined) { $scope.catalog_pglen = 10; }

    $scope.createCatalog = function () {
        if (id === undefined) {
            passData.set("CurCatalog", { items: [], delItems: [] });
            $state.go('app.catalog');
        }
    };

    $scope.loadCatalog = function (id) {
        getCatalogSrv.get({ id: id }).$promise.then(function (response) {
            var curCatalog = JSON.parse(JSON.stringify(response));
            //curCatalog.delItems = curCatalog.items.filter(img => img.isActive === false);
            //curCatalog.items = curCatalog.items.sort(function (a, b) {
            //    return a.position - b.position;
            //}).filter(img => img.isActive === true);
            passData.set("CurCatalog", curCatalog);
            $state.go('app.catalog');
        },
        function (error) {
            alert("Error Retrieving catalogs : " + error);
        });
    };

    $scope.dtColumnsColls = [
        DTColumnBuilder.newColumn("name", "Description").withOption('name', 'description')
            .renderWith(function (data, type, full, meta) {
                html = '<a ng-click="loadCatalog(' + full.catalogId + ')">' + data + '</a>';
                return html;
            }),
        DTColumnBuilder.newColumn("description", "Description").withOption('name', 'Description')
    ];

    $scope.dtOptionsColls = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            dataSrc: "data",
            url: "api/Catalogs/getData",
            type: "POST"
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withOption('responsive', true)
        .withOption('stateSave', true)
        .withOption('createdRow', function (row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);      // Recompiling so we can bind Angular directive to the DT
        })
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength($scope.catalog_pglen) // Page size
        .withOption('aaSorting', [1, 'asc']) // for default sorting column // here 0 means first column
        .withOption('drawCallback', function () {
            var table = this.DataTable();
            passData.set("catalog_pglen", table.page.len());
        })
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {
                text: 'New',
                action: function (e, dt, node, config) {
                    $scope.createCatalog();
                }
            },
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.dtInstanceCallbackColls = (dtInstance) => {
        dtInstance.DataTable.on('draw.dt', () => {
            let elements = angular.element("#" + dtInstance.id + " .ng-scope");
            angular.forEach(elements, (element) => {
                $compile(element)($scope);
            });
        });
    };

    $scope.SelectSet = (event) => {
        
    };
}

angular
    .module('inspinia')
    .controller('CatalogsCtrl', CatalogsCtrl);

   