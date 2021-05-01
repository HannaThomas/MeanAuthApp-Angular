import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service'
import { FlashMessagesService } from 'flash-messages-angular';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private flashmessage:FlashMessagesService,
    private router :Router
  ) { }

  ngOnInit(): void {
  }
  onLogoutClick(){
    this.authService.logout();
    this.flashmessage.show("You are successfully logged in!!!",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/dashboard']);
  }

}
