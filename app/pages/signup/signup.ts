import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading} from 'ionic-angular';
import {HomePage} from '../home/home';
// import {AngularFire} from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignUpPage {
 loader:Loading
  form = {
    name: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public toast : ToastController, public loadingController:LoadingController) {
        
  }
  presentLoading(showLoading:boolean) {
    
    if (showLoading == true){
  this.loader = this.loadingController.create({
      content: "Please wait."
    //  duration: 5000
    });
    console.log('Sabar Kar')
    this.loader.present();
    }
    else {
     this.loader.dismiss()
   
   }
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
    this.presentLoading(true)
   
        
       let user = {name:this.form.name , email: this.form.email, password : this.form.password} 
        //send the received uid
      //  ref.object('/users/'+user.username).set(user).then((pushSuccess) => {
        firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then(onSuccess => {
          console.log(onSuccess['uid'])
        this.navCtrl.popToRoot();    
        firebase.database().ref('/users/'+onSuccess['uid']).set(user).then(userCreated => {
      
         
         console.log("user"+userCreated)
    //    console.log(creationFailed)
    //              let error = creationFailed['message'] as string
    //    this.presentAlert(error)
    //     })
      })//, creationFailed=>{
        
        }/*, onFailure => {
          console.log(onFailure)
          //           let error = onFailure['message'] as string
          //  setTimeout(function(){
       //  },1000);
       }*/).catch(failure=>{
          this.presentLoading(false)
     // setTimeout(timeout=>{
         console.log(failure)

         this.presentAlert(failure['message'])
        
       //   },2000)
  
     })
        
        
        
      //  this.navCtrl.popToRoot();

  //})
  }
}
presentAlert(message:string) {
 let toast = this.toast.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
}
}
