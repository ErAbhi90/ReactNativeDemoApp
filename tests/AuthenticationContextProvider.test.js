
import React, {useContext} from "react";
import {AuthenticationContext, AuthenticationContextProvider} from "../src/services/authentication/authentication.context"
// import { AuthenticationContext } from "../src/services/authentication/authentication.context";

// import * as firebase from "firebase";
// import * as firebase from "firebase/auth";
import { loginRequest } from "../src/services/authentication/authentication.service";

const userMock = {uid: 1, name: 'Bob', email: "example@gmail.com"};

jest.mock('firebase', () => {
    return {
      auth: () => { return {signInWithEmailAndPassword: jest.fn(()=> new Promise((resolve, reject) => resolve(userMock)) )};},
    };
  });


  //
test('should return the authenticated used', () => {

  return loginRequest("", "").then(userAuthenticated => expect(userAuthenticated).toEqual(userMock));
});



