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
// import {AngularFire} from 'angularfire2';
var firebase = require('firebase');
var SignUpPage = (function () {
    function SignUpPage(navCtrl, toast, loadingController) {
        this.navCtrl = navCtrl;
        this.toast = toast;
        this.loadingController = loadingController;
        this.form = {
            name: '',
            email: '',
            password: ''
        };
    }
    SignUpPage.prototype.presentLoading = function (showLoading) {
        var loader;
        if (showLoading == true) {
            loader = this.loadingController.create({
                content: "Please wait."
            });
            loader.present();
        }
        else if (showLoading == false) {
            loader.dismissAll();
        }
    };
    SignUpPage.prototype.goToLogIn = function () {
        // console.log("goToLogIn",f.value);
        this.navCtrl.popToRoot();
    };
    SignUpPage.prototype.signUp = function () {
        var _this = this;
        if (this.form.email == "" || this.form.name == "" || this.form.password == "") {
            this.presentAlert('All fields are required');
        }
        else {
            this.presentLoading(true);
            var user_1 = { name: this.form.name, email: this.form.email, password: this.form.password };
            //send the received uid
            //  ref.object('/users/'+user.username).set(user).then((pushSuccess) => {
            firebase.auth().createUserWithEmailAndPassword(user_1.email, user_1.password).then(function (onSuccess) {
                console.log(onSuccess['uid']);
                _this.navCtrl.popToRoot();
                firebase.database().ref('/users/' + onSuccess['uid']).set(user_1).then(function (userCreated) {
                    console.log("user" + userCreated);
                    //    console.log(creationFailed)
                    //              let error = creationFailed['message'] as string
                    //    this.presentAlert(error)
                    //     })
                }); //, creationFailed=>{
            } /*, onFailure => {
              console.log(onFailure)
              //           let error = onFailure['message'] as string
              //  setTimeout(function(){
           //  },1000);
           }*/ /*, onFailure => {
              console.log(onFailure)
              //           let error = onFailure['message'] as string
              //  setTimeout(function(){
           //  },1000);
           }*/).catch(function (failure) {
                _this.presentLoading(false);
                // setTimeout(timeout=>{
                console.log(failure);
                _this.presentAlert(failure['message']);
                //   },2000)
            });
        }
    };
    SignUpPage.prototype.presentAlert = function (message) {
        var toast = this.toast.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });
        toast.present(toast);
    };
    SignUpPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/signup/signup.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.ToastController, ionic_angular_1.LoadingController])
    ], SignUpPage);
    return SignUpPage;
}());
exports.SignUpPage = SignUpPage;
