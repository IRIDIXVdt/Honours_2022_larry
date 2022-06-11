import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertService } from 'src/app/shared/service/alert.service';
import { DatabaseService } from 'src/app/shared/service/database.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  cCode: string = 'COSC304'; acItem = ''; anItem = ''; atItem = '';

  cList = ['All', 'COSC111', 'COSC304', 'COSC404',];

  sList: any;
  sListTemp = [
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
  aTime = ['2022WT1', '2022WT2', '2022ST1', '2022ST1', '2023WT1', '2023WT2'];

  constructor(
    private als: AlertService,
    private das: DatabaseService,
    private afs: AngularFirestore,
  ) {
    this.fetchSession();
  }

  ngOnInit() {
  }

  fetchSession() {
    this.sList = null;
    this.das.getSessionData(this.cCode).then(v => {
      this.sList = v;
      console.log(this.sList);
    });
  }

  addSession() {
    //confirmation
    this.als.presentChoice('Do you want to add this session to the list? This action cannot be undone.').then(loadingItem => {
      if (loadingItem) {
        const data = {//prepare data
          sCode: this.acItem,
          sTime: this.atItem,
          sNumber: this.anItem,
        }
        loadingItem.dismiss();
        //verify data valid
        if (!this.dataValid(data)) {//don't add
          this.als.displayMessage('Invalid data field: Missing attribute(s) or session already exists. Please try again.');
        } else {//then add data
          //remote adding
          this.das.addData("sessionCollection", data).then(v => {
            //remote action success
            console.log('current data is ', data);
            //then local data action
            // this.sList.push(data);
            this.fetchSession();
            console.log(this.sList);
            //reset data field
          });
        }
      } else {
        console.log('dismiss');
      }
    })

  }

  dataValid(data) {
    if (data.sCode.length == 0 || data.sTime.length == 0 || data.sNumber.length == 0)
      //make sure all field are provided
      return false;
    else if (
      //and make sure there is no matching
      this.sList.filter(
        e => e.sCode == data.sCode && e.sTime == data.sTime && e.sNumber == data.sNumber
      ).length > 0)
      return false;
    else
      return true;
  }

}
