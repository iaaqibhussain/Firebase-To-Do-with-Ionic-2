import {Page, NavController} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {UserService} from "../../service/userservice";
@Page({
    templateUrl: 'build/pages/add/add.html'
})
export class AddPage {
 
    public todoList: Array<string>;
    public todoItem: string;
    public firebase: AngularFire;
    constructor(private nav: NavController, firebase:AngularFire) {
        this.firebase = firebase
     //   this.todoList = JSON.parse(localStorage.getItem("todos"));
    //    if(!this.todoList) {
    //        this.todoList = [];
      //  }
        this.todoItem = "";
    }
 
     save() {
        if(this.todoItem != "") {
          //  this.todoList.push(this.todoItem);
            
            var toDoListData = this.firebase.database.list('/toDoListData/'+UserService.getInstance().uid);
        toDoListData.push({
            "description": this.todoItem,
            "user": UserService.getInstance().name,
            "timestamp": (new Date()).getTime()
        }).then((_data) => {
            console.log(_data)
            alert("Item Successfully Added")
        
        }).catch((_error) => {
            console.log(_error)
            alert("Error Adding Item")
        })
    }
        //    localStorage.setItem("todos", JSON.stringify(this.todoList));
            this.nav.pop();
        }
    

}
    
 
