import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore) { }

  addDataService(collection, data) {
    return this.db.collection(collection).add(data);
  }

  getDataService() {
    return this.db.collection("TestCollection1").snapshotChanges();
  }

  getUserDataByIdService(collection,userId) {
    return this.db.collection(collection).doc(userId).snapshotChanges();
  }

  getCollection(collection){
    return this.db.collection(collection).snapshotChanges();
  }
}
