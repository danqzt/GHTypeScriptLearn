/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../Scripts/typings/angularjs/angular-route.d.ts"/>
module MyApp {
    'use strict'

    export interface IFilter {
        filter(input: any, ...args: any[]): any;
    }

    var appName: string;

    export class Module {

        static name : string;

        static app: ng.IModule;

        constructor(name: string) {
            appName = name;
            Module.app = angular.module(appName, ['ngRoute']);

        }

        static start(config: any) {
            Module.registerConstant('env', config);
            var widget = angular.element(document.querySelector(config.widgetSelector));
            widget.append('<div ng-view></div>')
            angular.bootstrap(widget, [appName]);
        }

        static registerFilter(name: string, filter:any) {
            Module.app.filter(name, filter);
        }

        static registerConstant(name: string, value: any) {
            Module.app.constant(name, value);
        }

        static registerService(name: string, instance: any) {
            Module.app.service(name, instance);
        }

        static registerController(name: string, instance: any) {
            Module.app.controller(name, instance);
        }

        static registerRoute(routeConfig: any)
        {
            Module.app.config(routeConfig); 
        }
    }

    new Module('gogon');
}
