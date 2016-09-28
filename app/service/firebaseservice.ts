import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
@Injectable()
export class FirebaseService {
 
  
  static config = {
  apiKey: "AIzaSyDTagSCAFipCD2BLiKl8If-Op5EQpdbodk",
  authDomain: "fir-start-3ff0d.firebaseapp.com",
  databaseURL: "https://fir-start-3ff0d.firebaseio.com",
  storageBucket: "fir-start-3ff0d.appspot.com",
  };
    private static instance;
  
  
       static getInstance() {
        if (FirebaseService.instance == null) {
            
            FirebaseService.instance = firebase.initializeApp(FirebaseService.config)
        }
 
        return FirebaseService.instance;
    }
  
 
        
    }
  
    
 
