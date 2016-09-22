import {Injectable} from "@angular/core";
@Injectable()
export class UserService {
   name:String
   email:String
   uid:String
  
    private static instance:UserService;
  
    static getInstance() {
        if (UserService.instance == null) {
            
            UserService.instance = new UserService();
        }
 
        return UserService.instance;
    }
  
    
 
}