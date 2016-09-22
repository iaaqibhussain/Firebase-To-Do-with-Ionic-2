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
var signup_1 = require('../signup/signup');
var list_1 = require('../list/list');
var HomePage = (function () {
    function HomePage(navCtrl, alert) {
        this.navCtrl = navCtrl;
        this.alert = alert;
        this.login = {
            email: '',
            password: ''
        };
    }
    HomePage.prototype.goToSignUp = function () {
        console.log("goToSignUp");
        this.navCtrl.push(signup_1.SignUpPage);
    };
    HomePage.prototype.logIn = function () {
        if (this.login.email == '' || this.login.password == '') {
            this.presentAlert();
        }
        else {
            this.navCtrl.push(list_1.ListPage);
            console.log("Credentials:", this.login);
        }
    };
    HomePage.prototype.presentAlert = function () {
        var alert = this.alert.create({
            title: 'Sorry',
            subTitle: 'Enter an Email and Passord to Log in.',
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.AlertController])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
