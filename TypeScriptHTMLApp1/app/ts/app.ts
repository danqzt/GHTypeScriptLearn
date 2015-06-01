
/*class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        if (!element) return;
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
   
};

/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>

module myapp.Controllers {
    'use strict';

    export interface ICounter {
        count: number;
        message: string;
        inc(): void;
        dec(): void;
        show: boolean;
    }

    export class MainCtl implements ICounter {

        count: number;
        message: string;
        show: boolean;

        constructor() {
            var vm = this;
            this.count = 10;
            this.show = true;
        }

        inc() {
            this.count++;
        }

        dec() {
            this.count--;
        }
    }
}

module myapp {
    //angular.module('myapp', [])
    //    .controller('mainCtl', myapp.Controllers.MainCtl);
}
*/