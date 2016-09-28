import {Page, NavController, NavParams} from 'ionic-angular';
// import {AngularFire} from 'angularfire2';
import {UserService} from "../../service/userservice";
import * as firebase from 'firebase';
@Page({
    templateUrl: 'build/pages/add/add.html'
})
export class AddPage {
 
    public todoList: Array<string>;
    public todoItem: string;
    getParams:any


    // public firebase: AngularFire;
    constructor(private nav: NavController, navParams : NavParams) {
        
        this.getParams = navParams.get('itemToUpdate');
        if (this.getParams != null){
            this.todoItem = this.getParams.val().description
        }
        else{
        console.log(this.getParams.val())
        this.todoItem = "";
    }
    }
     save() {
         

        if(this.todoItem != "") {
          //  this.todoList.push(this.todoItem);
      if (this.getParams != null){
        var objectKey = this.getParams.key 
        let updatedData = {  "description": this.todoItem,
            "user": UserService.getInstance().name,
            "timestamp": (new Date()).getTime()
       }
        var update = firebase.database().ref('/toDoListData/'+UserService.getInstance().uid).child(objectKey).update(updatedData, updateSuccess =>{
            console.log('Updated'+updateSuccess)
             this.nav.pop();
            
    })

      }   
      else{   
         var toDoListData = firebase.database().ref('/toDoListData/'+UserService.getInstance().uid);
        toDoListData.push({
            "description": this.todoItem,
            "user": UserService.getInstance().name,
            "timestamp": (new Date()).getTime()
       
     }).then((_data) => {
            console.log(_data)
            this.nav.pop();
        
        }).catch((_error) => {
            console.log(_error)

        })
    }
        }
        //    localStorage.setItem("todos", JSON.stringify(this.todoList));
            
        }
    

}
    
 
