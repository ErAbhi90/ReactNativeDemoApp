
import { loginRequest, createUserRequest, signOutRequest } from "../src/services/authentication/authentication.service";
import * as firebase from "firebase";
import { describe } from "jest-circus";

import React, { useContext } from "react";
import { AuthenticationContext, AuthenticationContextProvider } from "../src/services/authentication/authentication.context"


const userMock = { uid: 1, name: 'Bob', email: "example@gmail.com" };
const mockCallback = jest.fn(() => userMock);
const apiError = new Error("API error");
const mockCallbackException = () => { throw apiError};
const mockVoidCallback = jest.fn(() => null);
const username = "username";
const password = "password";

var mockHasError = false;

jest.mock('firebase', () => {
    return {
        auth: () => { return { 
            signInWithEmailAndPassword: mockHasError ? mockCallbackException : mockCallback, 
            createUserWithEmailAndPassword: mockHasError ? mockCallbackException : mockCallback, 
            signOut: mockHasError ? mockCallbackException : mockCallback 
        }; },
    };
});


beforeEach(() => {
    mockHasError = false;
    return jest.clearAllMocks();
});

describe("Sign In", () => {

    test('should return the authenticated used during sign in', async () => {

        const userAuthenticated = await loginRequest("", "");
        expect(userAuthenticated).toEqual(userMock);

    });

    test('should throw an exception when sign in external API throws an exception ', async () => {
        mockHasError = true;

        expect(loginRequest).toThrow(apiError);

    });

    test('should call the external sign in api only one time', async () => {

        await loginRequest(username, password);
        expect(firebase.auth().signInWithEmailAndPassword.mock.calls.length).toEqual(1);
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalled();
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenLastCalledWith(username, password);

    });

    test('should use the correct arguments username and password values for external sign in api', async () => {

        await loginRequest(username, password);
        expect(firebase.auth().signInWithEmailAndPassword.mock.calls[0][0]).toEqual(username);
        expect(firebase.auth().signInWithEmailAndPassword.mock.calls[0][1]).toEqual(password);

    });
});

describe("Registration", () => {

    test('should return the authenticated used during registration', async () => {

        const userAuthenticated = await createUserRequest(username, password);
        expect(userAuthenticated).toEqual(userMock);

    });

    test('should throw an exception when Registration external API throws an exception ', async () => {
        mockHasError = true;

        expect(createUserRequest).toThrow(apiError);

    });


    test('should call the external sign in api only one time', async () => {

        await createUserRequest(username, password);
        expect(firebase.auth().createUserWithEmailAndPassword.mock.calls.length).toEqual(1);
        expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalled();
        expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenLastCalledWith(username, password);

    });


    test('should use the correct arguments username and password values for external sign up api', async () => {

        await loginRequest(username, password);
        expect(firebase.auth().createUserWithEmailAndPassword.mock.calls[0][0]).toEqual(username);
        expect(firebase.auth().createUserWithEmailAndPassword.mock.calls[0][1]).toEqual(password);

    });


});

describe("Signout", () => {

    test('should call the external signout api only one time', async () => {

        await signOutRequest();
        expect(firebase.auth().signOut.mock.calls.length).toEqual(1);
        expect(firebase.auth().signOut).toHaveBeenCalled();

    });

    test('should throw an exception when Signout external API throws an exception ', async () => {
        mockHasError = true;

        expect(signOutRequest).toThrow(apiError);

    });



});

