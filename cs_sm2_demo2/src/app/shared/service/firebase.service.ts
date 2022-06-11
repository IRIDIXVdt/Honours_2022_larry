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

  getUserDataByIdService(collection, userId) {
    return this.db.collection(collection).doc(userId).get();
  }

  getCollection(collection) {
    return this.db.collection(collection).get();
  }

  getDocument(collection, docId) {
    return this.db.doc(collection + '/' + docId).get();
  }

  getCollectionWithFilter(collection, filter) {
    return this.db.collection(collection, filter).get();
  }

  getSessionWithFilter(collection, code, order) {
    return this.db.collection(collection, ref =>
      ref.where('sCode', '==', code).orderBy(order))
      .get();
  }

}
