

//kGlobals.define(['underscore', 'angular', 'angular-route'], function (_, ng, ngRoute) {
(function() {
    'use strict';
    var ng = angular;
    var appName = 'myapp';

    var app = ng.module(appName, ['ngRoute']);

    // App Config
    (function () {
        app.filter('truncate', function () {
            return function (text, length, end) {
                if (isNaN(length))
                    length = 10;

                if (end === undefined)
                    end = "...";

                if (text.length <= length || text.length - end.length <= length) {
                    return text;
                }
                else {
                    return String(text).substring(0, length - end.length) + end;
                }

            };
        });
        app.filter('replace', function () {
            return function (text, find, replacement) {
                if (find === undefined)
                    return text;

                var rx = new RegExp(find, "gi");

                return (text || '').replace(rx, replacement || '');
            };
        });

        app.filter('formatAsHtml', ['$sce', function ($sce) {
            return function (text) {
                if (!text)
                    return '';

                return $sce.trustAsHtml(text.replace(/\n/gi,'<br/>'));
            };
        }]);

    })();

    // App Services
    (function () {


        app.service('sitesService', ['$http', '$q','environment', function ($http, $q,environment) {

            var cache = { followedSites: null, allSites :null };

            var getSiteTypes = function () {
                var rt = [];
                var host = environment.apiPath.substr(0, environment.apiPath.indexOf('/', 10));

                rt.push({
                    name: 'Work'
                        , description: 'These contents will be contributed to work related discussions.'
                        , examples: [
                            'Has a specific outcome'
                            , 'Has a Limited Life span'
                            , 'Can manage risks, issues , tasks and milestones'
                        ]
                        , baseAddress: host + '/sites/'
                        , canBePublic: true
                });

               

                rt.push({
                    name: 'Non Work'
                        , description: 'These contents will be contributed to non-work related discussions.'
                        , examples: [
                            'Cross functional, not for a specific organizational team'
                            , 'Open by default so anyone at CCA can follow the site'
                            , 'For a specific interest or event, either work related or social \n e.g. Sustainability September, Coke Active, Music, Pets, etc.'
                            , 'Conversational in nature, share information on an interest'
                            , 'To meet others in CCA that share your interest'
                        ]
                        , baseAddress: host + '/sites/'
                        , canBePublic: true
                });
                return rt;

            }
   
            var getSiteVisibilityTypes = function ()
            {
                var rt = [];

                rt.push({
                    name: 'Public'
                    , description: 'Anyone in the Coca-Cola Amatil network can view content and participate.'
                    , isPublic: true
                });

                rt.push({
                    name: 'Private'
                    , description: 'Membership is by approval/invitation only and only members can view content and participate.'
                    , isPublic: false
                });

                return rt;
            }

            var getSiteCategoriesByType = function (type) {
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
            }

            var getSiteTemplatesByType = function (type) {
                var rt = [];
                if (!type)
                    return rt;

                rt.push({ name: 'Team', description: '' });

                if (type.name != 'Non Work') 
                    rt.push({ name: 'Project', description: '' });
               
                return rt;
            }

            var getSiteLogoOptions = function () {
                var rt = [];

                rt.push({ url: 'http://upload.wikimedia.org/wikipedia/commons/7/7e/Moroccan_F-5_jet.jpg' });
                rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo2_M.jpg' });
                rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo3_M.jpg' });
                rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo4_M.jpg' });

                return rt;
            }

            var createGroups = function (categories) {
                
                ng.forEach(categories, function (value) {
                    createGroupInternal(value.name)
                });
                createGroupInternal("Non Work") 
            }

            var createGroupInternal = function (name) {
                var ctx = new SP.ClientContext(environment.apiPath);
                var web = ctx.get_web();
                var groupCreationInfo = new SP.GroupCreationInformation();
                groupCreationInfo.set_title(name + " Approvers");
                var group = web.get_siteGroups().add(groupCreationInfo);
                var roleBinding = SP.RoleDefinitionBindingCollection.newObject(ctx);
                var approveRole = web.get_roleDefinitions().getByName('Approve');
                roleBinding.add(approveRole);
                web.get_roleAssignments().add(group, roleBinding);

                ctx.load(group);
                ctx.executeQueryAsync(
                    function () { console.log('Groups Created:' + group.get_title()); },
                    function (sndr, args) { 'group: ' + group.get_title() + ' ' + console.error(args.get_message()); }
                );
            }

            var submitSiteRequest = function (site) {
                var deferred = $q.defer();

                var ctx = new SP.ClientContext(environment.apiPath);
                var reqList = ctx.get_web().get_lists().getByTitle(environment.requestsList);
                var item = reqList.addItem(new SP.ListItemCreationInformation());
                var category = site.category ? site.category.name : site.type.name;
                item.set_item('kUrl', site.url);
                item.set_item('Title', site.title);
                item.set_item('kDescription', site.description);
                item.set_item('kType', site.template.name);
                item.set_item('kCategory', category);
                item.set_item('kVisibility', site.visibility);
                item.set_item('kLogoUrl', site.logo.url);
                item.set_item('kApprover', SP.FieldUserValue.fromUser(category + ' Approvers'));
                //item.set_item('kKeywords', '');

                if (site.members) {
                    var users = new Array();
                    for (var i = 0; i < site.members.length; i++)
                        users.push(SP.FieldUserValue.fromUser(site.members[i].Key));
                    item.set_item('kMembers', users);
                }
               
                item.update();
                ctx.load(item, 'Created');

                ctx.executeQueryAsync(
                           function () {
                               var created = item.get_item('Created');
                               var id = item.get_id();
                               var formatNum = function(num){  return num < 10 ? '0' + num : num; }
                               var requestNumber = site.type.name.substr(0,4).toUpperCase()
                                   + '-'
                                   + created.getFullYear() 
                                   + formatNum(created.getMonth() + 1) 
                                   + formatNum(created.getDate())
                                   + '-' + formatNum(id);
                               item.set_item('kRequestNumber', requestNumber);
                               item.set_item('kStatus', 'Submitted');
                               item.update();

                               ctx.executeQueryAsync(
                                   function () { deferred.resolve(requestNumber); }
                                   , function (sndr, args) { deferred.reject(args.get_message()); }
                                   );
                               
                           }
                           ,  function (sndr, args) { deferred.reject(args.get_message()); }
                       );

                return deferred.promise;
            }

            var urlIsAvailable = function (url){
                var deferred = $q.defer();

                if (url.indexOf('http') > -1)
                    url = url.substr(url.indexOf('/', 10));

                var ctx = new SP.ClientContext(environment.apiPath);
                var reqList = ctx.get_web().get_lists().getByTitle(environment.requestsList);
                var dirList = ctx.get_web().get_lists().getByTitle(environment.directoryList);
              
                var query = "<View>"
                + "<ViewFields><FieldRef Name='ID'/></ViewFields>"
                + "<Query><Where><Eq><FieldRef Name='kUrl'/><Value Type='URL'>" + url + "</Value></Eq></Where></Query>"
                + "<RowLimit>1</RowLimit>"
                + "</View>"
                ;
                var camlQuery = new SP.CamlQuery();
                camlQuery.set_viewXml(query);

                var reqMatches = reqList.getItems(camlQuery)
                var dirMatches = dirList.getItems(camlQuery)

                ctx.load(reqMatches);
                ctx.load(dirMatches);

                ctx.executeQueryAsync(
                    function () {
                        deferred.resolve(reqMatches.get_count() == 0 && dirMatches.get_count() == 0);
                    }
                    , function (sndr, args) { deferred.reject(args.get_message()); }
                    );

                return deferred.promise;
            }

            return {
                getSiteTypes: getSiteTypes
                , getSiteVisibilityTypes: getSiteVisibilityTypes
                , getSiteCategoriesByType: getSiteCategoriesByType
                , getSiteTemplatesByType: getSiteTemplatesByType
                , getSiteLogoOptions: getSiteLogoOptions
                , submitSiteRequest: submitSiteRequest
                , urlIsAvailable: urlIsAvailable
                , createGroups : createGroups
            };
        }]);
    })();


    // Controllers
    (function () {


        app.controller(
            'FormInitController', ['$scope','$location', 'sitesService', function ($scope,$location, sitesService) {

                var vm = this;
                vm.siteTypes = [];
                vm.site = null;

                vm.selectType = function (type){
                    vm.site.type = type;
                    vm.site.visibility = 'Private';
                    vm.site.template = '';

                    if (type.name === 'Non Work')
                        $location.path("/info")
                    else
                        $location.path("/categories")
                }

                //-----------------

                var init = function () {
                    vm.site = $scope.getSiteDefinition();
                    vm.siteTypes = sitesService.getSiteTypes();
                }
                init();
            }]);


        app.controller(
            'FormCategoriesController', ['$scope', '$location', 'sitesService', function ($scope, $location, sitesService) {

                var vm = this;
                vm.site = null;
                vm.siteCategories = [];

                vm.previousStep = function () { $location.path("/"); }

                vm.selectCategory = function (category) {
                    vm.site.category = category;
                    $location.path("/info")
                }
               
                vm.createGroups = function () {
                    sitesService.createGroups(vm.siteCategories);
                }
                //-----------------

                var init = function () {
                    vm.site = $scope.getSiteDefinition();
                    if (!vm.site.type)
                        $location.path("/error");

                    vm.siteCategories = sitesService.getSiteCategoriesByType(vm.site.type);
                }
                init();
            }]);


        app.controller(
          'FormInfoController', ['$scope', '$location', 'sitesService', function ($scope, $location, sitesService) {
              var vm = this;
              vm.site = null;
              vm.visibilityTypes = [];
              vm.siteLogoOptions - [];
              vm.siteTemplateTypes = [];
              vm.urlIsTaken = false;
              vm.submitting = false;

              vm.titleKeyListener = function ($event) {
                  var cleanString = vm.site.title ? vm.site.title.replace(/[|:&;$\^\!%@"<>()+,\[\]='\s\*\?\\#~`\/.]/g, "").replace(/(-)(?=-*\1)/g, '') : '';
                  vm.site.name = cleanString;
                  vm.site.url = (vm.site.type.baseAddress || '') + cleanString;
              }

            


              vm.previousStep = function () {
                  if (vm.site.type.name === 'Non Work')
                      $location.path("/")
                  else
                      $location.path("/categories")
              }
              vm.nextStep = function () {
                  vm.urlIsTaken = false;
                  vm.submitting = true;

                  var cleanString = vm.site.name.replace(/[|:&;$\^\!%@"<>()+,\[\]='\s\*\?\\#~`\/.]/g, "").replace(/(-)(?=-*\1)/g, '');
                  vm.site.name = cleanString;
                  vm.site.url = (vm.site.type.baseAddress || '') + cleanString;

                  sitesService.urlIsAvailable(vm.site.url)
                    .then(function (yes) {
                        if(yes)
                            $location.path("/confirm");
                        else
                            vm.urlIsTaken = true;
                    })
                      ['catch'](function (error) { console.log(error); })
                      ['finally'](function () { vm.submitting = false; });
              }

              vm.siteIsPublic = function () {
                  var rt = false;
                  vm.visibilityTypes
                      .filter(function (x) { return x.name === vm.site.visibility; })
                      .forEach(function (x) { rt = x.isPublic; return; })

                 
                  return rt;
              }

              vm.selectLogo = function (logo) {
                  vm.site.logo = logo;
              }

              //-----------------

              var init = function () {
                  vm.site = $scope.getSiteDefinition();
                  if (!vm.site.type || vm.site.type == '')
                      $location.path("/error");
                  
                  vm.siteLogoOptions = sitesService.getSiteLogoOptions();
                  vm.visibilityTypes = sitesService.getSiteVisibilityTypes();

                  vm.siteTemplateTypes = sitesService.getSiteTemplatesByType(vm.site.type);
                  if (vm.siteTemplateTypes.length == 1)
                      vm.site.template = vm.siteTemplateTypes[0];
              }

              init();
          }]);


        app.controller(
         'FormConfirmationController', ['$scope', '$location', 'sitesService', function ($scope, $location, sitesService) {

             var vm = this;
             vm.site = null;
             vm.error = '';
             vm.submitted = false;
             vm.completed = false;
             vm.submitting = false;
             vm.confirmationNumber = null;
             vm.submissionProperties = [];
             vm.visibilityTypes = [];

             vm.previousStep = function () { $location.path("/info"); }

             vm.submitRequest = function () {
                 vm.submitting = true;
                 vm.submitted = true;

                 sitesService.submitSiteRequest(vm.site)
                     .then(function (results) {
                         vm.completed = true;
                         vm.confirmationNumber = results;
                         $scope.resetSiteDefinition();
                     })
                     ['catch'](function (error) {
                         vm.error = error;
                         vm.completed = false;
                     })
                    ['finally'](function () {
                        vm.submitting = false;
                    });

             }

             vm.siteIsPublic = function () {
                 var rt = false;
                 vm.visibilityTypes
                     .filter(function (x) { return x.name === vm.site.visibility; })
                     .forEach(function (x) { rt = x.isPublic; return; })


                 return rt;
             }

             //-----------------

             var init = function () {
                 vm.site = $scope.getSiteDefinition();
                 if (!vm.site.type)
                     $location.path("/error");


                 vm.visibilityTypes = sitesService.getSiteVisibilityTypes();

                 vm.siteCategories = sitesService.getSiteCategoriesByType(vm.site.type);
                 vm.submissionProperties.push({ name: 'Type', value: vm.site.type.name });
                 vm.submissionProperties.push({ name: 'Category', value: vm.site.category ? vm.site.category.name : vm.site.type.name });
                 vm.submissionProperties.push({ name: 'Title', value: vm.site.title });
                 vm.submissionProperties.push({ name: 'Description', value: vm.site.description });
                 vm.submissionProperties.push({ name: 'Url', value: vm.site.url });
                 vm.submissionProperties.push({ name: 'Logo', value: vm.site.logo.url, isImage: true });
                 vm.submissionProperties.push({ name: 'Visibility', value: vm.site.visibility });
                 vm.submissionProperties.push({ name: 'Template', value: vm.site.template.name });

                 if (vm.siteIsPublic() == false) {
                     var names = [];
                     for(var i = 0 ; i < (vm.site.members || []).length; i++)
                         names.push(vm.site.members[i].DisplayText)
                     //vm.submissionProperties.push({ name: 'Members', value: names.join('; ') });
                 }
                    
                 //vm.submissionProperties.push({ name: 'Keywords', value: vm.site.keywords });
             }

             init();
         }]);


        

    })();


    var start = function (config) {
        var widget = ng.element(document.querySelector(config.widgetSelector));
        widget.append('<div ng-view></div>')
        var appPath = '/app/templates';

        var rnd = Math.random();
        var envModule = ng.module('Environment_' + config.widgetSelector, []);
        envModule.constant('environment', {
            appPath: appPath
            , apiPath: config.apiPath
            , directoryList: config.directoryList
            , requestsList: config.requestsList
            , defaultViewSettings: config.defaultViewSettings || {}
        });


        // configure our routes
        app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', { templateUrl: appPath + '/' + 'Form-Init.html' })
                .when('/categories', { templateUrl: appPath + '/' + 'Form-Categories.html' })
                .when('/info', { templateUrl: appPath + '/' + 'Form-Info.html' })
                .when('/confirm', { templateUrl: appPath + '/' + 'Form-Confirm.html' })
                .otherwise({ redirectTo: '/' })
            ;
        }]);


        app.run(['$rootScope', function ( $rootScope) {
            var site = {
                type: 
                    //{ name: 'Team' }
                 null
                , title: ''
                , url: ''
                , visibility: 'Private'
               
            };
            $rootScope.getSiteDefinition = function () { return site; }
            $rootScope.resetSiteDefinition = function(){ site = {}; };
        }]);


        ng.bootstrap(widget, [app.name, envModule.name]);
    }


    ////return {
    ////    start: start
    ////};

    start({
        apiPath:'/'
            , directoryList: 'Sites-Directory'
            , requestsList: 'Site-Creation-Requests'
            , widgetSelector: '#sitesRequrests-App'
            , defaultViewSettings: { key: '', filter: '' }
    });



    //})
})()



