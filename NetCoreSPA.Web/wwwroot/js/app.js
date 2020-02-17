/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('inspinia', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                   // ngSanitize
        'ngResource',                    // ngResource
        'datatables',
        'datatables.buttons',
        'ngFileUpload'
    ]);
})();

angular.module('inspinia').config(['$compileProvider', function ($compileProvider) { $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//); }]); 

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad