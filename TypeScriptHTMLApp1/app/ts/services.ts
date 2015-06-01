module MyApp.Services {
    'use strict';

    export class SiteService {

        static $inject = ['env', '$q', '$timeout'];
        private host: string;
        private siteExists: boolean = false;
        private siteDef: MyApp.Model.ISiteDefinition;

        constructor(private env: any,
            private $q: ng.IQService,
            private $timeout: ng.ITimeoutService) {
            this.host = env.apiPath.substr(0, env.apiPath.indexOf('/', 10));
            this.siteDef = {
                type: null
                , title: ''
                , url: ''
                , visibility: MyApp.Model.Visibility.Private
                , category: ''
            };
        }

        getSiteTypes() {
            var rt: MyApp.Model.ISiteType[] = [];
            rt.push({
                name: 'Work'
                , description: 'These contents will be contributed to work related discussions.'
                , examples: [
                    'Has a specific outcome'
                    , 'Has a Limited Life span'
                    , 'Can manage risks, issues , tasks and milestones'
                ]
                , baseAddress: this.host + '/sites/'
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
                , baseAddress: this.host + '/sites/'
                , canBePublic: true
            });

            return rt;

        }

        getSiteVisibility() {
            var rt: MyApp.Model.ISiteVisibility[] = [];

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
        getSiteCategoriesByType(type: MyApp.Model.ISiteInfo) {
            var rt: MyApp.Model.ISiteInfo[] = [];
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

        getSiteTemplatesByType(type: MyApp.Model.ISiteInfo) {
            var rt: MyApp.Model.ISiteInfo[] = [];
            if (!type)
                return rt;

            rt.push({ name: 'Team', description: '' });

            if (type.name != 'Non Work')
                rt.push({ name: 'Project', description: '' });

            return rt;
        }

        getSiteLogoOptions() {
            var rt: any[] = [];

            rt.push({ url: 'http://upload.wikimedia.org/wikipedia/commons/7/7e/Moroccan_F-5_jet.jpg' });
            rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo2_M.jpg' });
            rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo3_M.jpg' });
            rt.push({ url: '/sites/hub/Style Library/SharedImages/SiteLogos/teamLogo4_M.jpg' });

            return rt;
        }

        urlIsAvailable(url) {
            this.$timeout(() => {
                this.siteExists = Math.floor((Math.random() * 10) + 1) % 2 == 0;
            }, 250);
        }

        getSiteDefinition(): MyApp.Model.ISiteDefinition {
                return this.siteDef;
        }


    }
} 

MyApp.Module.registerService('siteService', MyApp.Services.SiteService); 