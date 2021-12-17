import * as firebase from "firebase";

export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const createUserRequest = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const signOutRequest = () =>
  firebase.auth().signOut();
