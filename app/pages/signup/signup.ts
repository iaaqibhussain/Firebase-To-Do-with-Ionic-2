import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {AngularFire} from 'angularfire2';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignUpPage {
  public firebase: AngularFire
  form = {
    name: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public alert : AlertController, firebase:AngularFire ,public loadingController:LoadingController) {
    this.firebase = firebase      

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
      this.presentAlert()
    }
    else{
    this.presentLoading()
    let user = {email: this.form.email, password : this.form.password}
    this.firebase.auth.createUser(user).then((onSuccess)=>{
        console.log('success',onSuccess);
        let uid = {uid: onSuccess["uid"]}
        var ref = this.firebase.database;
       let user = {name:this.form.name , email: this.form.email, password : this.form.password} 
        //send the received uid
        ref.object('/users/'+uid.uid).set(user).then((pushSuccess) => {
            console.log("PushSuccess:"+pushSuccess)
        this.form.email = ""
        this.form.name = ""
        this.form.password = ""
        this.navCtrl.popToRoot();
        
        
        
      //  this.navCtrl.popToRoot();
      },(onFailure)=>{

        console.log("failure",onFailure["code"]);
                console.log("failure",onFailure["message"]);

      })

  })
  }
}
presentAlert() {
  let alert = this.alert.create({
    title: 'Sorry',
    subTitle: 'All fields are required',
    buttons: ['OK']
  });
  alert.present();
}
}
