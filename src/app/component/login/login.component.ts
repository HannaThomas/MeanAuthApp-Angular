import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service'
import { FlashMessagesService } from 'flash-messages-angular';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username="";
  public password="";
  constructor(
    public authService:AuthService,
    private flashmessage:FlashMessagesService,
    private router :Router) { }

  ngOnInit(): void {
  }
  onLoginSubmit(){
    console.log("logion metghod works!!")
    const user={
      username:this.username,
      password:this.password
    }
    this.authService.authenticateUser(user).subscribe(data =>{
      console.log(data);
      if(data['success']){
        this.authService.storeUserData(data['token'],data['user']);
        this.flashmessage.show("You are successfully logged in!!!",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/dashboard']);
      }else{
        this.flashmessage.show(data['msg'],{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/login']);
      }
    });
  }
}
