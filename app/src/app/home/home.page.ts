import { Component } from '@angular/core';
import { record } from '../@models/app.model';
import { format, parseISO } from 'date-fns';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dateValue = format(new Date(), 'yyyy-MM-dd');
  formattedString = '';

  iconType = {
    Food: 'beer',
    Entertainment: 'today',
    Necessities: 'happy',
  } as any;

  recordsObj: record[] = [];


  constructor(private homeService: HomeService) {
    this.setToday();
  }

  get newRecord() {
    const record: record[] = [];

    return record;
  }

  delete(rmItem: record) {
    this.recordsObj = this.recordsObj.filter((data) => data !== rmItem);
  }

  setToday() {
    this.formattedString = format(new Date(), 'yyyy-MM-dd');
  }

  date2() {
    return JSON.stringify(this.formattedString, null, 2);
  }

  dateChanged(value: any) {
    this.dateValue = value;
    this.formattedString = format(parseISO(value), 'yyyy-MM-dd');
  }

  async returnDate() {
    let result: any = await this.homeService.selectValue(this.dateValue);
    this.recordsObj = result.map((v: any) => {
      return {
        ...v,
        "Icon": this.iconType[v['type']]
      }
    })
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