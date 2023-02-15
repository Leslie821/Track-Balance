import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isModalOpenRegister = false;
  isModalOpenForgot = false;

  user = {
    email: '',
    password: ''
  }

  userReg = {
    name: '',
    password: '',
    email: '',
  }

  userForgot = {
    email: '',
  }

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  async submit() {
    console.log('submit', this.user)
    await this.userService.login(this.user)
    location.href = "http://localhost:4200/home";
  }
  async register() {
    console.log('submit', this.userReg)
    await this.userService.register(this.userReg)
    location.href = "http://localhost:4200/login";
  }

  async uploadAlbum() {
    console.log('submit', this.userReg)
  }

  data() {
    return JSON.stringify(this.user, null, 2)
  }
  data2() {
    return JSON.stringify(this.userReg, null, 2)
  }

  goHome() {
    location.href = "http://localhost:4200/home";
  }
  goAdd() {
    location.href = "http://localhost:4200/ai-ai";
  }
  goLogin() {
    location.href = "http://localhost:4200/login";
  }


}
