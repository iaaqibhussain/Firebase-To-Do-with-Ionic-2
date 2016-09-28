import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import {HomePage} from '../home/home';
// import {AngularFire} from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignUpPage {
 
  form = {
    name: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public alert : AlertController, public loadingController:LoadingController) {
          

  }
  presentLoading() {
    let loader = this.loadingController.create({
      content: "Please wait.",
      duration: 1500
    });
    loader.present();
  }
  goToLogIn(){
    // console.log("goToLogIn",f.value);
    this.navCtrl.popToRoot();

  } 
  signUp(){
    if (this.form.email == "" || this.form.name == "" || this.form.password == ""){
      this.presentAlert( 'All fields are required')
    }
    else{
    this.presentLoading()
   
        
       let user = {name:this.form.name , email: this.form.email, password : this.form.password} 
        //send the received uid
      //  ref.object('/users/'+user.username).set(user).then((pushSuccess) => {
        firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then(onSuccess => {
          console.log(onSuccess['uid'])
        this.navCtrl.popToRoot();    
        firebase.database().ref('/users/'+onSuccess['uid']).set(user).then(userCreated => {
      
         
         console.log("user"+userCreated)
     }, creationFailed=>{
       console.log(creationFailed)
                 let error = creationFailed['message'] as string
       this.presentAlert(error)
        })
        
        }, onFailure => {
          console.log(onFailure)
                    let error = onFailure['message'] as string
                 this.presentAlert(error)
        })
        
        
        
      //  this.navCtrl.popToRoot();

  //})
  }
}
presentAlert(message:string) {
  let alert = this.alert.create({
    title: 'Sorry',
    subTitle:message,
    buttons: ['OK']
  });
  alert.present();
}
}
