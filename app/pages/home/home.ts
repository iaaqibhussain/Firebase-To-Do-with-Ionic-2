import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import {SignUpPage} from '../signup/signup';
import {ListPage} from '../list/list';
import {Observable} from 'rxjs/Observable';
import {UserService} from "../../service/userservice";
import {FirebaseService} from "../../service/firebaseservice";
//import {AngularFire,FirebaseAuth, FirebaseListObservable, FirebaseAuthState} from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/home/home.html'

})
export class HomePage {
  
 loader:any
  items : any
  firbaseRef : any
  users: Observable<any[]>;
  userLogin = {
    email:'',
    password:''

  }
  constructor(public navCtrl: NavController, public alert: AlertController, public loadingController : LoadingController) {
  
    this.userLogin.email = "a@c.com"
    this.userLogin.password = "111111"
    FirebaseService.getInstance()
    
  }
  goToSignUp(){
    
    console.log("goToSignUp");
    this.navCtrl.push(SignUpPage);
  }
  presentLoading() {
    this.loader = this.loadingController.create({
      content: "Please wait.",
      duration: 1500
    });
    this.loader.present();
    
  }
  logInUser(){
    if (this.userLogin.email == '' || this.userLogin.password == ''){
      this.presentAlert('Enter an Email and Passord to Log in.')

    }
    else{
      this.presentLoading()
        firebase.auth().signInWithEmailAndPassword(this.userLogin.email,this.userLogin.password).then(onSuccess =>{
          
       UserService.getInstance().uid = onSuccess['uid']
          console.log(UserService.getInstance().uid)
       firebase.database().ref('users').child(onSuccess['uid']).once('value', snapshot =>{

        UserService.getInstance().name = snapshot.val().name
      

       })   
           this.navCtrl.push(ListPage); 
        },onFailure => {
          console.log(onFailure)
          let error = onFailure['message']
          this.presentAlert(error)

        }).catch(exception =>{
          console.log(exception)
        })


    //  this.items.subscribe(snapshots => {
    // snapshots.forEach(snapshot => {

    //   if (snapshot.$key == "password"){
    //  if (snapshot.$value == this.userLogin.password){



    //  }
    // }
    //  if (snapshot.$key == "username"){
    //   UserService.getInstance().username = snapshot.$value
    // }
    //   if (snapshot.$key == "name"){
    //   UserService.getInstance().name = snapshot.$value
    // }
    // });
   

//      console.log("Credentials:",this.items.count)
       
//console.log("Credentials:", this.items.first)
      
      


      

      
    }
  }
presentAlert(message:string) {
  console.log(message)
  let alert = this.alert.create({
    title: 'Sorry',
    subTitle: message,
    buttons: [ {
          text: 'OK',
          handler : (data) => {
            //alert.destroy()

        //    console.log('pressed'+data)
          }
    }]
  });
  
  
  alert.present();
}
}
