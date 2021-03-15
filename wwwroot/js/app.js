(function () {
    angular.module('inspinia', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'ui.bootstrap.datepicker',
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                   // ngSanitize
        'ngResource',                    // ngResource
        'ngAnimate',
        'ngTouch',
        'datatables',
        'datatables.buttons',
        'ngFileUpload',
        'ngStorage'
    ]);
})();

angular
    .module('inspinia')
    .filter('range', function () {
        return function (input, total) {
            total = parseInt(total);
            for (var i = 0; i < total; i++)
                input.push(i);
            return input;
        };
    })
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);
    }]); 

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad