import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  host = 'http://localhost:3000';
  constructor(private api: ApiService) { }

  createUser() {
    return fetch(`${this.host}/newFrom`, {
      method: 'POST',
    });
  }

  async selectValue(dateValue: string) {
    let result = await this.api.post('/selectDate', { date: dateValue });
    return result;
  }
}
