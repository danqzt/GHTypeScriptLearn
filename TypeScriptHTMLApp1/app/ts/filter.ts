module MyApp.Filters {
    'use strict';

    export class FormatAsHtml {

        static $inject = ['$sce'];

        static filter($sce: ng.ISCEService) {
            return (text: string) => {
                if (!text) return '';

                return $sce.trustAsHtml(text);
            }
        }
    }
} 

MyApp.Module.registerFilter('formatAsHtml', MyApp.Filters.FormatAsHtml.filter);