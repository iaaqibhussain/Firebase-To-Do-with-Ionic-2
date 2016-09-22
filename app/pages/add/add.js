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
var angularfire2_1 = require('angularfire2');
var AddPage = (function () {
    function AddPage(nav, firebase) {
        this.nav = nav;
        this.firebase = firebase;
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if (!this.todoList) {
            this.todoList = [];
        }
        this.todoItem = "";
    }
    AddPage.prototype.save = function () {
        if (this.todoItem != "") {
            this.todoList.push(this.todoItem);
            var textItems = this.firebase.database.list('/textItems');
            textItems.push({
                "title": "Ionic 2 with Firebase and Typescript",
                "description": "Test Message from ionic app",
                // auth data from the navParam object...
                "user": "Aaqib Hussain",
                "timestamp": (new Date()).getTime()
            }).then(function (_data) {
                console.log(_data);
                alert("Item Successfully Added");
            }).catch(function (_error) {
                console.log(_error);
                alert("Error Adding Item");
            });
        }
        localStorage.setItem("todos", JSON.stringify(this.todoList));
        this.nav.pop();
    };
    AddPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/add/add.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, angularfire2_1.AngularFire])
    ], AddPage);
    return AddPage;
}());
exports.AddPage = AddPage;
