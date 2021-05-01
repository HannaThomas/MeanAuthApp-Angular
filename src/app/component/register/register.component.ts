import { Component, OnInit,Input } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService} from '../../services/auth.service'
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public name="";
  public username= "";
  public email="";
  public password=""; 
  
  constructor(
    private validateService:ValidateService, 
    private authService:AuthService, 
    private flashmessage:FlashMessagesService,
    private router :Router) { }
  ngOnInit(): void {
   
  }
  onRegisterSubmit()
  {
    const user={
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }
    //console.log(user.name);
    
    if(!this.validateService.validateRegister(user)){
      this.flashmessage.show("Please fill in all details",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    //else return true;
    if(!this.validateService.validateEmail(user.email)){
      console.log("Please use a valid email");
      return false;
    }
    //else {return true;}
    this.authService.registerUser(user).subscribe(data=>{
      console.log(user);
      if(data['success']){
        this.router.navigate(['/login']);
        this.flashmessage.show("You are successfully registered!!!",{cssClass:'alert-success',timeout:3000});
      }else{
        this.router.navigate(['/register']);
        this.flashmessage.show("Something went wrong!!!",{cssClass:'alert-danger',timeout:3000});
      }
    });
    return undefined;
  }

 

}
