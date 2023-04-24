import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore) { }

  addDataService(collection, data) {
    return this.db.collection(collection).add(data);
  }

  updateDataById(collection, docId, data) {
    return this.db.doc(collection + '/' + docId).update(data);
  }

  removeDataById(docId) {
    return this.db.doc(docId).delete();
  }

  getCollection(collection) {
    return this.db.collection(collection).get();
  }

  getCOSC211Collection() {
    return this.db.collection("QuestionCollection", ref =>
      ref.orderBy("des", "asc")
    ).get();
  }

  getCollectionWithOrder(collection, order) {
    return this.db.collection(collection, ref =>
      ref.orderBy(order, "asc")).get();
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

  getDataWithFilter(collection, target, targetValue) {
    return this.db.collection(collection, ref => ref.where(target, '==', targetValue)).get();
    // return this.db.collection(collection, ref => ref.where('qCourse', '==', 'cosc304')).get();
  }

  getCollectionFilter(collection, type, targetValue) {
    return this.db.collection(collection, ref =>
      ref.where(type, '==', targetValue)).get();
  }

  getProgressCollection(userId: string) {
    // const time = new Date().getTime();
    // console.log('currentTime', time)
    // return this.db.collection('users' + '/' + userId + '/' + 'answerList', ref =>
    //   ref.where('nextTime', '<', time)).get();

    return this.db.collection('users' + '/' + userId + '/' + 'answerList').get();
  }

  getUser(userId) {
    return this.db.doc(`users/${userId}`) as AngularFirestoreDocument<any>;
  }

}
