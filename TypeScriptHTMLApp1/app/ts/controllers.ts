module MyApp.Controllers {
    'use strict';

    export class FormInitCtl {

        static $inject = ['siteService', '$location'];
        
        siteTypes: MyApp.Model.ISiteType[];
        site: MyApp.Model.ISiteDefinition;

        constructor(private siteService: MyApp.Services.SiteService,
            private $location: ng.ILocationService) {

            var vm = this;
            this.siteTypes = this.siteService.getSiteTypes();
            this.site = this.siteService.getSiteDefinition();
        }

        selectType(type: Model.ISiteVisibility) {
            this.site.type = type.name;
            if (type.name == 'Non Work') {
                this.$location.path('/info');
            } else
                this.$location.path('/categories');
        }   
    }

    export class FormCategoryCtl {

        static $inject = ['siteService', '$location'];

        site: MyApp.Model.ISiteDefinition;
        siteCategories: MyApp.Model.ISiteInfo[];

        constructor(private siteService: MyApp.Services.SiteService,
            private $location: ng.ILocationService) {

            var vm = this;
            this.site = this.siteService.getSiteDefinition();
            this.siteCategories = siteService.getSiteCategoriesByType(this.site.type);
        }

        previousStep() {
            this.$location.path('/');
        }

        selectCategory(cat) {
            this.site.category = cat;
            this.$location.path('/info');
        }
    }
} 

MyApp.Module.registerController('FormInitController', MyApp.Controllers.FormInitCtl);
MyApp.Module.registerController('FormCategoriesController', MyApp.Controllers.FormCategoryCtl);