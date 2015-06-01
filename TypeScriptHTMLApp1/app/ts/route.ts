module MyApp.Config {
    'use strict';

    export function Route($routeProvider: ng.route.IRouteProvider) {
        var appPath = '/app/templates';
        $routeProvider
            .when('/', { templateUrl: appPath + '/' + 'Form-Init.html' })
            .when('/categories', { templateUrl: appPath + '/' + 'Form-Categories.html' })
            .when('/info', { templateUrl: appPath + '/' + 'Form-Info.html' })
            .when('/confirm', { templateUrl: appPath + '/' + 'Form-Confirm.html' })
            .otherwise({ redirectTo: '/' });
    }

    Route.$inject = ['$routeProvider'];
} 

MyApp.Module.registerRoute(MyApp.Config.Route);