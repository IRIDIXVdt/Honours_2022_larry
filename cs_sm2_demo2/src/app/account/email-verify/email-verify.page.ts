import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.page.html',
  styleUrls: ['./email-verify.page.scss'],
})
export class EmailVerifyPage implements OnInit {
  constructor( public authService: AuthService) { this.startTimer()}
  ngOnInit() {}

  timeLeft: number = 60;
  interval;
  block:boolean =true;
  resetTimeLeft(){
    this.timeLeft =60;
  }

  startTimer() {
    return this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.block = true;
        this.timeLeft= this.timeLeft-1;
      } else {       
        this.block = false;
        clearInterval(this.interval);
        return false;
      }
    },1000)
  }
}
