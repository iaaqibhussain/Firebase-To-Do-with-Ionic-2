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
var ionic_angular_1 = require('ionic-angular');
// import {AngularFire} from 'angularfire2';
var userservice_1 = require("../../service/userservice");
var firebase = require('firebase');
var AddPage = (function () {
    // public firebase: AngularFire;
    function AddPage(nav, navParams) {
        this.nav = nav;
        this.getParams = navParams.get('itemToUpdate');
        if (this.getParams != null) {
            this.todoItem = this.getParams.val().description;
        }
        else {
            console.log(this.getParams.val());
            this.todoItem = "";
        }
    }
    AddPage.prototype.save = function () {
        var _this = this;
        if (this.todoItem != "") {
            //  this.todoList.push(this.todoItem);
            if (this.getParams != null) {
                var objectKey = this.getParams.key;
                var updatedData = { "description": this.todoItem,
                    "user": userservice_1.UserService.getInstance().name,
                    "timestamp": (new Date()).getTime()
                };
                var update = firebase.database().ref('/toDoListData/' + userservice_1.UserService.getInstance().uid).child(objectKey).update(updatedData, function (updateSuccess) {
                    console.log('Updated' + updateSuccess);
                    _this.nav.pop();
                });
            }
            else {
                var toDoListData = firebase.database().ref('/toDoListData/' + userservice_1.UserService.getInstance().uid);
                toDoListData.push({
                    "description": this.todoItem,
                    "user": userservice_1.UserService.getInstance().name,
                    "timestamp": (new Date()).getTime()
                }).then(function (_data) {
                    console.log(_data);
                    _this.nav.pop();
                }).catch(function (_error) {
                    console.log(_error);
                });
            }
        }
        //    localStorage.setItem("todos", JSON.stringify(this.todoList));
    };
    AddPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/add/add.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], AddPage);
    return AddPage;
}());
exports.AddPage = AddPage;
