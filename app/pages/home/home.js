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
var userservice_1 = require("../../service/userservice");
var firebaseservice_1 = require("../../service/firebaseservice");
//import {AngularFire,FirebaseAuth, FirebaseListObservable, FirebaseAuthState} from 'angularfire2';
var firebase = require('firebase');
var HomePage = (function () {
    function HomePage(navCtrl, toast, loadingController) {
        this.navCtrl = navCtrl;
        this.toast = toast;
        this.loadingController = loadingController;
        this.userLogin = {
            email: '',
            password: ''
        };
        this.userLogin.email = "a@c.com";
        this.userLogin.password = "111111";
        firebaseservice_1.FirebaseService.getInstance();
    }
    HomePage.prototype.goToSignUp = function () {
        console.log("goToSignUp");
        this.navCtrl.push(signup_1.SignUpPage);
    };
    HomePage.prototype.presentLoading = function () {
        this.loader = this.loadingController.create({
            content: "Please wait.",
            duration: 1500
        });
        this.loader.present();
    };
    HomePage.prototype.logInUser = function () {
        var _this = this;
        if (this.userLogin.email == '' || this.userLogin.password == '') {
            this.presentAlert('Enter an Email and Passord to Log in.');
        }
        else {
            this.presentLoading();
            firebase.auth().signInWithEmailAndPassword(this.userLogin.email, this.userLogin.password).then(function (onSuccess) {
                userservice_1.UserService.getInstance().uid = onSuccess['uid'];
                console.log(userservice_1.UserService.getInstance().uid);
                firebase.database().ref('users').child(onSuccess['uid']).once('value', function (snapshot) {
                    userservice_1.UserService.getInstance().name = snapshot.val().name;
                });
                _this.navCtrl.push(list_1.ListPage);
            }, function (onFailure) {
                console.log(onFailure);
                var error = onFailure['message'];
                _this.presentAlert(error);
            }).catch(function (exception) {
                console.log(exception);
            });
        }
    };
    HomePage.prototype.presentAlert = function (message) {
        console.log(message);
        var toast = this.toast.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });
        toast.present(toast);
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.ToastController, ionic_angular_1.LoadingController])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
