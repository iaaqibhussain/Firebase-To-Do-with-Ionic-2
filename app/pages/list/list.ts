import {Page, NavController} from 'ionic-angular';
import {AddPage} from "../add/add";
import {UserService} from "../../service/userservice";
import {AngularFire,FirebaseAuth, FirebaseListObservable, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';


@Page({
    templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
    
    public todoList: Array<string>;
    items : any
    firebase : AngularFire
    constructor(private nav: NavController, firebase : AngularFire) { 
    this.firebase = firebase
    console.log("Emaru:"+UserService.getInstance().email)
        console.log("Namae:"+UserService.getInstance().name)
    this.items = this.firebase.database.object('/toDoListData/'+UserService.getInstance().uid).subscribe(snapshots => {
    snapshots.forEach(snapshot => {
      console.log(snapshot.$key,snapshot.$value)
      if (snapshot.$key == "name"){
      //UserService.getInstance().name = snapshot.$value
      
 }
     if (snapshot.$key == "email"){
    //  UserService.getInstance().email = snapshot.$value
    }
    });
   
})   
        
        
    }
 
    onPageDidEnter() {
        // this.todoList = JSON.parse(localStorage.getItem("todos"));
        // if(!this.todoList) {
        //     this.todoList = [];
        // }
    }

    delete(index: number) {
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }
 
    add() {
        this.nav.push(AddPage);
    }
    logout(){
        this.nav.pop();

      }
}





































































































































































































































































































































































































































































































































































































































































































































