import {Injectable} from "@angular/core";
@Injectable()
export class UserService {
   name:string
   username:string
   uid:string
  
    private static instance:UserService;
  
    static getInstance() {
        if (UserService.instance == null) {
            
            UserService.instance = new UserService();
        }
 
        return UserService.instance;
    }
  
    
 
}