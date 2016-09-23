import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import {SignUpPage} from '../signup/signup';
import {ListPage} from '../list/list';
import {Observable} from 'rxjs/Observable';
import {UserService} from "../../service/userservice";
import {AngularFire,FirebaseAuth, FirebaseListObservable, FirebaseAuthState} from 'angularfire2';
@Component({
  templateUrl: 'build/pages/home/home.html'

})
export class HomePage {
  public firebase : AngularFire
  items :FirebaseListObservable<any>
  public auth: FirebaseAuth
  users: Observable<any[]>;
  userLogin = {
    email:'',
    password:''

  }
  constructor(public navCtrl: NavController, public alert: AlertController, firebase: AngularFire , auth:FirebaseAuth ,public loadingController : LoadingController) {
    this.firebase = firebase
    this.auth = auth
    this.userLogin.email = "aa@c.com"
    this.userLogin.password = "123215432"

  }
  goToSignUp(){
    
    console.log("goToSignUp");
    this.navCtrl.push(SignUpPage);
  }
  presentLoading() {
    let loader = this.loadingController.create({
      content: "Please wait.",
      duration: 1500
    });
    loader.present();
  }
  logInUser(){
    if (this.userLogin.email == '' || this.userLogin.password == ''){
      this.presentAlert()

    }
    else{
      this.presentLoading()
      this.firebase.auth.login(this.userLogin).then((success)=>{
    UserService.getInstance().uid = success['uid']
     this.items = this.firebase.database.list('/users/'+success['uid'])

     this.items.subscribe(snapshots => {
    snapshots.forEach(snapshot => {
 //     console.log(snapshot.$key,snapshot.$value)
      if (snapshot.$key == "name"){
      UserService.getInstance().name = snapshot.$value
    }
     if (snapshot.$key == "email"){
      UserService.getInstance().email = snapshot.$value
    }
    });
    this.navCtrl.push(ListPage); 
})
//      console.log("Credentials:",this.items.count)
       
//console.log("Credentials:", this.items.first)
      })

      
    }
  }
presentAlert() {
  let alert = this.alert.create({
    title: 'Sorry',
    subTitle: 'Enter an Email and Passord to Log in.',
    buttons: ['OK']
  });
  alert.present();
}
}
