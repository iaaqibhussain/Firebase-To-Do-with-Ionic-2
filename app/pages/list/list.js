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
var add_1 = require("../add/add");
var userservice_1 = require("../../service/userservice");
// import {AngularFire, FirebaseListObservable} from 'angularfire2';
var firebase = require('firebase');
var ListPage = (function () {
    // items : FirebaseListObservable<any>
    // firebase : AngularFire
    function ListPage(nav) {
        var _this = this;
        this.nav = nav;
        this.todoList = [];
        // this.firebase = firebase
        var date = new Date(1474665002034);
        console.log(date);
        console.log(userservice_1.UserService.getInstance().uid);
        firebase.database().ref('/toDoListData/' + userservice_1.UserService.getInstance().uid).once('value').then(function (dataSnap) {
            // console.log("snap"+dataSnap.val().description)
            dataSnap.forEach(function (element) {
                console.log(element.val());
                //  this.todoList.push(element.val())
            });
        });
        firebase.database().ref('/toDoListData/' + userservice_1.UserService.getInstance().uid).on('child_added', (function (dataSnap) {
            // console.log("snap"+dataSnap.val().description)
            console.log(dataSnap.val());
            // this.todoList.push(dataSnap.val())
            _this.todoList.push(dataSnap);
        }));
        firebase.database().ref('/toDoListData/' + userservice_1.UserService.getInstance().uid).on('child_removed', (function (dataSnap) {
            // console.log("snap"+dataSnap.val().description)
            console.log(dataSnap.val());
            _this.todoList.splice(_this.indexToDelete, 1);
            //this.todoList.push(dataSnap.key)
        }));
        firebase.database().ref('/toDoListData/' + userservice_1.UserService.getInstance().uid).on('child_changed', (function (dataSnap) {
            // console.log("snap"+dataSnap.val().description)
            console.log(dataSnap.val());
            _this.todoList[_this.indexToDelete] = dataSnap;
            //this.todoList.push(dataSnap.key)
        }));
        //        //new array of dates banana paregA?
        // this.items = this.firebase.database.list('/toDoListData/'+UserService.getInstance().username)
        // this.items.subscribe(snapshots => {
        // this.todoList = snapshots
        //  console.log(this.todoList)
        // this.todoList.forEach((element,i) => {
        //     console.log(element.timestamp)
        //     this.todoList[i].timestamp = new Date(element.timestamp)
        //     console.log(this.todoList[i].timestamp)
        // });       
        //})      
    }
    ListPage.prototype.delete = function (index) {
        console.log("This friggin index:" + this.todoList[index]);
        this.indexToDelete = index;
        firebase.database().ref('/toDoListData/' + userservice_1.UserService.getInstance().uid + '/' + this.todoList[index].key).remove(function (onSuccess) {
            //    this.todoList.splice(index,1)
            //      console.log(onSuccess)
        });
        //      this.items.remove(this.todoList[index].$key).then(onSuccess =>{
        //})
    };
    ListPage.prototype.update = function (index) {
        console.log("This friggin index:" + this.todoList[index]);
        this.indexToDelete = index;
        this.nav.push(add_1.AddPage, { itemToUpdate: this.todoList[index], update: 'update' });
        //      this.items.remove(this.todoList[index].$key).then(onSuccess =>{
        //})
    };
    ListPage.prototype.add = function () {
        this.nav.push(add_1.AddPage);
    };
    ListPage.prototype.logout = function () {
        var _this = this;
        firebase.auth().signOut().then(function (success) {
            _this.nav.pop();
        });
    };
    ListPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/list/list.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], ListPage);
    return ListPage;
}());
exports.ListPage = ListPage;
