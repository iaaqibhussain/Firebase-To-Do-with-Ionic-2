import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, alertControl : AlertController, firebase:AngularFire) {
    this.firebase = firebase      

  }

  goToLogIn(){
    // console.log("goToLogIn",f.value);
    this.navCtrl.popToRoot();

  } 
  signUp(){
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
