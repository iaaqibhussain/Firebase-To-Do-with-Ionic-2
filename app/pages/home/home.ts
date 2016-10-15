import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';
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
  
  loader: Loading
  items : any
  firbaseRef : any
  users: Observable<any[]>;
  userLogin = {
    email:'',
    password:''

  }
  constructor(public navCtrl: NavController, public toast: ToastController, public loadingController : LoadingController) {
  
    FirebaseService.getInstance()
    
  }
  goToSignUp(){
    
    console.log("goToSignUp");
    this.navCtrl.push(SignUpPage);
  }
   
  logInUser(){
    if (this.userLogin.email == '' || this.userLogin.password == ''){
      this.presentAlert('Enter an Email and Passord to Log in.')

    }
    else{
        firebase.auth().signInWithEmailAndPassword(this.userLogin.email,this.userLogin.password).then(onSuccess =>{
          
       UserService.getInstance().uid = onSuccess['uid']
          console.log(UserService.getInstance().uid)
       firebase.database().ref('users').child(onSuccess['uid']).once('value', snapshot =>{

        UserService.getInstance().name = snapshot.val().name
      

       })   
           this.navCtrl.push(ListPage); 
        }).catch(exception =>{
          console.log(exception)
          this.presentAlert( exception['message'])
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
   let toast = this.toast.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
}
}
