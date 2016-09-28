import {Page, NavController} from 'ionic-angular';
import {AddPage} from "../add/add";
import {UserService} from "../../service/userservice";
// import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as firebase from 'firebase';

@Page({
    templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
    
    public todoList = [];
    public indexToDelete: number;
    // items : FirebaseListObservable<any>
    // firebase : AngularFire
    constructor(private nav: NavController) { 
    // this.firebase = firebase
        let date = new Date(1474665002034)
  
           console.log(date)
  ;
console.log(UserService.getInstance().uid)
firebase.database().ref('/toDoListData/'+UserService.getInstance().uid).once('value').then((dataSnap)=>{
// console.log("snap"+dataSnap.val().description)

dataSnap.forEach((element) => {
    console.log(element.val())
  //  this.todoList.push(element.val())
});

})  
  firebase.database().ref('/toDoListData/'+UserService.getInstance().uid).on('child_added', ((dataSnap)=>{
// console.log("snap"+dataSnap.val().description)

    console.log(dataSnap.val())
  // this.todoList.push(dataSnap.val())
  
  this.todoList.push(dataSnap)
}))

firebase.database().ref('/toDoListData/'+UserService.getInstance().uid).on('child_removed', ((dataSnap)=>{
// console.log("snap"+dataSnap.val().description)

    console.log(dataSnap.val())
    this.todoList.splice(this.indexToDelete,1)
   //this.todoList.push(dataSnap.key)
}))

firebase.database().ref('/toDoListData/'+UserService.getInstance().uid).on('child_changed', ((dataSnap)=>{
// console.log("snap"+dataSnap.val().description)

    console.log(dataSnap.val())
this.todoList[this.indexToDelete] = dataSnap
   //this.todoList.push(dataSnap.key)
}))
    //        //new array of dates banana paregA?
    // this.items = this.firebase.database.list('/toDoListData/'+UserService.getInstance().username)
    // this.items.subscribe(snapshots => {
    // this.todoList = snapshots
    //  console.log(this.todoList)
    // this.todoList.forEach((element,i) => {
    //     console.log(element.timestamp)
    //     this.todoList[i].timestamp = new Date(element.timestamp)
    //     console.log(this.todoList[i].timestamp)
    // });       

//})      
    }
 


    delete(index: number) {
        console.log("This friggin index:"+this.todoList[index])
        this.indexToDelete = index
    firebase.database().ref('/toDoListData/'+UserService.getInstance().uid+'/'+this.todoList[index].key).remove(onSuccess =>{
    //    this.todoList.splice(index,1)
  //      console.log(onSuccess)
    })
  //      this.items.remove(this.todoList[index].$key).then(onSuccess =>{
        
      
        //})

    }
        update(index: number) {
        console.log("This friggin index:"+this.todoList[index])
        this.indexToDelete = index
        this.nav.push(AddPage,{itemToUpdate: this.todoList[index], update:'update'})
  //      this.items.remove(this.todoList[index].$key).then(onSuccess =>{
        
      
        //})

    }
 
    add() {
        this.nav.push(AddPage);
    }
    logout(){
        firebase.auth().signOut().then(success=>{
        this.nav.pop();

        })

      }
}






































































































































































































































































































































































































































































































































































































































































































































