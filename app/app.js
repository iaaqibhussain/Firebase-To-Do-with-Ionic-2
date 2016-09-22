"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var home_1 = require('./pages/home/home');
var angularfire2_1 = require('angularfire2');
var MyApp = (function () {
    function MyApp(platform) {
        this.platform = platform;
        this.rootPage = home_1.HomePage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
        });
    }
    MyApp = __decorate([
        core_1.Component({
            template: '<ion-nav [root]="rootPage"></ion-nav>',
            providers: [angularfire2_1.FIREBASE_PROVIDERS, angularfire2_1.defaultFirebase({
                    apiKey: "AIzaSyDTagSCAFipCD2BLiKl8If-Op5EQpdbodk",
                    authDomain: "fir-start-3ff0d.firebaseapp.com",
                    databaseURL: "https://fir-start-3ff0d.firebaseio.com",
                    storageBucket: "fir-start-3ff0d.appspot.com",
                })
            ]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform])
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
ionic_angular_1.ionicBootstrap(MyApp);
