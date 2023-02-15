import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  host = 'http://localhost:3000'
  constructor(
    private api: ApiService,
  ) { }

  async login(
    user: { email: string, password: string }
  ) {
    console.log('do login')
    let json = await this.api.post('/user/confirmLogin', user)
    console.log('login result:', json)
    return json
  }

  async register(
    user: { name: string, password: string, email: string }
  ) {
    console.log('register')
    let json = await this.api.post('/user/register', user)
    return
  }
  async getProfile(id: number) {
    let json = await this.api.get(`/user/${id}/profile`)
  }

  async searchUser(username: string) {
    let json = await this.api.get(`/user/search`, { username })
  }
}
