import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home';


import {
    FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig ,AuthMethods,
  AuthProviders, FirebaseListObservable,
    AngularFire
} from 'angularfire2';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [FIREBASE_PROVIDERS, defaultFirebase({
      apiKey: "AIzaSyDTagSCAFipCD2BLiKl8If-Op5EQpdbodk",
    authDomain: "fir-start-3ff0d.firebaseapp.com",
    databaseURL: "https://fir-start-3ff0d.firebaseio.com",
    storageBucket: "fir-start-3ff0d.appspot.com",
  }),firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  })
  ]

})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
