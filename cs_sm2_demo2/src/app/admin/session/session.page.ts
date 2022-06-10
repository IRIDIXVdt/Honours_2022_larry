import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  cCode: string = 'All'; acItem = ''; anItem = ''; atItem = '';

  cList = ['All', 'COSC111', 'COSC404', 'COSC304',]

  sList = [
    {
      sCode: 'COSC304',
      sTime: '2022WT1',
      sNumber: '001'
    },
    {
      sCode: 'COSC304',
      sTime: '2022WT1',
      sNumber: '002'
    },
    {
      sCode: 'COSC304',
      sTime: '2021ST1',
      sNumber: '001'
    },
    {
      sCode: 'COSC304',
      sTime: '2021ST2',
      sNumber: '001'
    },
  ]

  aCode = ['COSC111', 'COSC304', 'COSC404'];
  aNumber = ['001', '002', '003', '004', '005'];
  aTime = ['2022WT1', '2022WT2', '2022ST1', '2022ST1'];

  constructor(
    private als: AlertService,
  ) { }

  ngOnInit() {
  }

  addSession() {
    //confirmation
    this.als.presentChoice('Do you want to add this session to the list?').then(loadingItem => {
      if (loadingItem) {
        const data = {
          sValue: this.acItem,
          sTime: this.atItem,
          sNumber: this.anItem,
        }
        //verify data valid

        //then add data
        console.log('current data is ', data);
        //reset data field
        loadingItem.dismiss();
      } else {
        console.log('dissmiss');
      }

    })

  }

}
