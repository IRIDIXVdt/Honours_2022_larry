import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  cCode: string = 'A';
  // cList:
  cList = [
    {
      cValue: 'A',
      cName: 'All'
    },
    {
      cValue: 'COSC111',
      cName: 'COSC 111'
    },
    {
      cValue: 'COSC404',
      cName: 'COSC 404'
    },
    {
      cValue: 'COSC304',
      cName: 'COSC 304'
    }
  ]

  sList = [
    {
      sValue: 'COSC304',
      sTime: '2022WT1',
      sNumber: '001'
    },
    {
      sValue: 'COSC304',
      sTime: '2022WT1',
      sNumber: '002'
    },
    {
      sValue: 'COSC304',
      sTime: '2021ST1',
      sNumber: '001'
    },
    {
      sValue: 'COSC304',
      sTime: '2021ST2',
      sNumber: '001'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
