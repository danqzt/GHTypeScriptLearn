var MyApp;
(function (MyApp) {
    'use strict';
    var appName;
    var Module = (function () {
        function Module(name) {
            appName = name;
            Module.app = angular.module(appName, ['ngRoute']);
        }
        Module.start = function (config) {
            Module.registerConstant('env', config);
            var widget = angular.element(document.querySelector(config.widgetSelector));
            widget.append('<div ng-view></div>');
            angular.bootstrap(widget, [appName]);
        };
        Module.registerFilter = function (name, filter) {
            Module.app.filter(name, filter);
        };
        Module.registerConstant = function (name, value) {
            Module.app.constant(name, value);
        };
        Module.registerService = function (name, instance) {
            Module.app.service(name, instance);
        };
        Module.registerController = function (name, instance) {
            Module.app.controller(name, instance);
        };
        Module.registerRoute = function (routeConfig) {
            Module.app.config(routeConfig);
        };
        return Module;
    })();
    MyApp.Module = Module;
    new Module('gogon');
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Model;
    (function (Model) {
        'use strict';
        (function (Visibility) {
            Visibility[Visibility["Private"] = 0] = "Private";
            Visibility[Visibility["Public"] = 1] = "Public";
        })(Model.Visibility || (Model.Visibility = {}));
        var Visibility = Model.Visibility;
    })(Model = MyApp.Model || (MyApp.Model = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Config;
    (function (Config) {
        'use strict';
        function Route($routeProvider) {
            var appPath = '/app/templates';
            $routeProvider.when('/', { templateUrl: appPath + '/' + 'Form-Init.html' }).when('/categories', { templateUrl: appPath + '/' + 'Form-Categories.html' }).when('/info', { templateUrl: appPath + '/' + 'Form-Info.html' }).when('/confirm', { templateUrl: appPath + '/' + 'Form-Confirm.html' }).otherwise({ redirectTo: '/' });
        }
        Config.Route = Route;
        Route.$inject = ['$routeProvider'];
    })(Config = MyApp.Config || (MyApp.Config = {}));
})(MyApp || (MyApp = {}));
MyApp.Module.registerRoute(MyApp.Config.Route);
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        'use strict';
        var SiteService = (function () {
            function SiteService(env, $q, $timeout) {
                this.env = env;
                this.$q = $q;
                this.$timeout = $timeout;
                this.siteExists = false;
                this.host = env.apiPath.substr(0, env.apiPath.indexOf('/', 10));
                this.siteDef = {
                    type: null,
                    title: '',
                    url: '',
                    visibility: 0 /* Private */,
                    category: ''
                };
            }
            SiteService.prototype.getSiteTypes = function () {
                var rt = [];
                rt.push({
                    name: 'Work',
                    description: 'These contents will be contributed to work related discussions.',
                    examples: [
                        'Has a specific outcome',
                        'Has a Limited Life span',
                        'Can manage risks, issues , tasks and milestones'
                    ],
                    baseAddress: this.host + '/sites/',
                    canBePublic: true
                });
                rt.push({
                    name: 'Non Work',
                    description: 'These contents will be contributed to non-work related discussions.',
                    examples: [
                        'Cross functional, not for a specific organizational team',
                        'Open by default so anyone at CCA can follow the site',
                        'For a specific interest or event, either work related or social \n e.g. Sustainability September, Coke Active, Music, Pets, etc.',
                        'Conversational in nature, share information on an interest',
                        'To meet others in CCA that share your interest'
                    ],
                    baseAddress: this.host + '/sites/',
                    canBePublic: true
                });
                return rt;
            };
            SiteService.prototype.getSiteVisibility = function () {
                var rt = [];
                rt.push({
                    name: 'Public',
                    description: 'Anyone in the Coca-Cola Amatil network can view content and participate.',
                    isPublic: true
                });
                rt.push({
                    name: 'Private',
                    description: 'Membership is by approval/invitation only and only members can view content and participate.',
                    isPublic: false
                });
                return rt;
            };
            SiteService.prototype.getSiteCategoriesByType = function (type) {
                var rt = [];
                if (!type)
                    return rt;
                if (type.name == 'Non Work') {
                }
                else {
                    rt.push({ name: 'General', description: '' });
                    rt.push({ name: 'Commercial', description: '' });
                    rt.push({ name: 'Corporate', description: '' });
                    rt.push({ name: 'Fiji', description: '' });
                    rt.push({ name: 'Finance', description: '' });
                    rt.push({ name: 'Human Resources', description: '' });
                    rt.push({ name: 'Indonesia', description: '' });
                    rt.push({ name: 'IT', description: '' });
                    rt.push({ name: 'Licensed', description: '' });
                    rt.push({ name: 'Marketing and Strategy', description: '' });
                    rt.push({ name: 'NCC', description: '' });
                    rt.push({ name: 'NZ', description: '' });
                    rt.push({ name: 'PNG', description: '' });
                    rt.push({ name: 'Retail & Services', description: '' });
                    rt.push({ name: 'Sales', description: '' });
                    rt.push({ name: 'SPC', description: '' });
                    rt.push({ name: 'Supply Chain', description: '' });
                }
                return rt;
            };
            SiteService.prototype.getSiteTemplatesByType = function (type) {
                var rt = [];
                if (!type)
                    return rt;
                rt.push({ name: 'Team', description: '' });
                if (type.name != 'Non Work')
                    rt.push({ name: 'Project', description: '' });
                return rt;
            };
            SiteService.prototype.getSiteLogoOptions = function () {
                var rt = [];
                rt.push({ url: 'http://upload.wikimedia.org/wikipedia/commons/7/7e/Moroccan_F-5_jet.jpg' });
                rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo2_M.jpg' });
                rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo3_M.jpg' });
                rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo4_M.jpg' });
                return rt;
            };
            SiteService.prototype.urlIsAvailable = function (url) {
                var _this = this;
                this.$timeout(function () {
                    _this.siteExists = Math.floor((Math.random() * 10) + 1) % 2 == 0;
                }, 250);
            };
            SiteService.prototype.getSiteDefinition = function () {
                return this.siteDef;
            };
            SiteService.$inject = ['env', '$q', '$timeout'];
            return SiteService;
        })();
        Services.SiteService = SiteService;
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
MyApp.Module.registerService('siteService', MyApp.Services.SiteService);
var MyApp;
(function (MyApp) {
    var Filters;
    (function (Filters) {
        'use strict';
        var FormatAsHtml = (function () {
            function FormatAsHtml() {
            }
            FormatAsHtml.filter = function ($sce) {
                return function (text) {
                    if (!text)
                        return '';
                    return $sce.trustAsHtml(text);
                };
            };
            FormatAsHtml.$inject = ['$sce'];
            return FormatAsHtml;
        })();
        Filters.FormatAsHtml = FormatAsHtml;
    })(Filters = MyApp.Filters || (MyApp.Filters = {}));
})(MyApp || (MyApp = {}));
MyApp.Module.registerFilter('formatAsHtml', MyApp.Filters.FormatAsHtml.filter);
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var FormInitCtl = (function () {
            function FormInitCtl(siteService, $location) {
                this.siteService = siteService;
                this.$location = $location;
                var vm = this;
                this.siteTypes = this.siteService.getSiteTypes();
                this.site = this.siteService.getSiteDefinition();
            }
            FormInitCtl.prototype.selectType = function (type) {
                this.site.type = type.name;
                if (type.name == 'Non Work') {
                    this.$location.path('/info');
                }
                else
                    this.$location.path('/categories');
            };
            FormInitCtl.$inject = ['siteService', '$location'];
            return FormInitCtl;
        })();
        Controllers.FormInitCtl = FormInitCtl;
        var FormCategoryCtl = (function () {
            function FormCategoryCtl(siteService, $location) {
                this.siteService = siteService;
                this.$location = $location;
                var vm = this;
                this.site = this.siteService.getSiteDefinition();
                this.siteCategories = siteService.getSiteCategoriesByType(this.site.type);
            }
            FormCategoryCtl.prototype.previousStep = function () {
                this.$location.path('/');
            };
            FormCategoryCtl.prototype.selectCategory = function (cat) {
                this.site.category = cat;
                this.$location.path('/info');
            };
            FormCategoryCtl.$inject = ['siteService', '$location'];
            return FormCategoryCtl;
        })();
        Controllers.FormCategoryCtl = FormCategoryCtl;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
MyApp.Module.registerController('FormInitController', MyApp.Controllers.FormInitCtl);
MyApp.Module.registerController('FormCategoriesController', MyApp.Controllers.FormCategoryCtl);
'use strict';
(function () {
    MyApp.Module.start({
        apiPath: '/app/templates',
        directoryList: 'Sites-Directory',
        requestsList: 'Site-Creation-Requests',
        widgetSelector: '#sitesRequrests-App',
        defaultViewSettings: { key: '', filter: '' }
    });
})();
//# sourceMappingURL=ngapp.js.map