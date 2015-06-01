module MyApp.Model {
    'use strict';

    export interface ISiteInfo {
        name: string;
        description: string;
    }

    export interface ISiteType extends ISiteInfo {
        examples: string[];
        baseAddress: string;
        canBePublic: boolean;
    }

    export interface ISiteVisibility extends ISiteInfo {
        isPublic: boolean;
    }

    export interface ISiteDefinition {
        title: string;
        type: any;
        url: string;
        visibility: Visibility;
        category: string;
    }

    export enum Visibility {
        Private, Public
    }


} 