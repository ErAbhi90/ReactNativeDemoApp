import React from "react";
import { LoginScreen } from "../login.screen";
import { render, screen, fireEvent, cleanup } from "@testing-library/react-native";
import { AuthButton } from "../../components/account.styles"
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../../../infrastructure/theme";
import { AuthenticationContextProvider } from "../../../../services/authentication/authentication.context";
import * as firebase from "firebase";
// import { Navigation } from "../../../../../src/infrastructure/navigation";

it('Test click event', () => {
    const mockCallBack = jest.fn();

    const { getByText } = render(
        <ThemeProvider theme={theme}>
            <AuthButton onPress={mockCallBack}>Test</AuthButton>
        </ThemeProvider>
    );
    fireEvent.press(getByText("Test"));
    expect(mockCallBack.mock.calls.length).toEqual(1);
});


afterEach(cleanup);

const firebaseConfig = {
  apiKey: "AIzaSyABgPJ4Bvf6ZIgC0t1OEOoJDZSZ-GvYjac",
  authDomain: "mealstogo-5fdee.firebaseapp.com",
  projectId: "mealstogo-5fdee",
  storageBucket: "mealstogo-5fdee.appspot.com",
  messagingSenderId: "461156744270",
  appId: "1:461156744270:web:0a3d9737a24acc9606571f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//SNAPSHOT test
test('if it renders', () => {
    const { toJSON } = render(
        <ThemeProvider theme={theme}>
            <AuthenticationContextProvider>
                <LoginScreen />
            </AuthenticationContextProvider>
        </ThemeProvider>);
    expect(toJSON()).toMatchSnapshot();
})

//UI test to check all the required elements are present
test('if all elements exists', () => {
    const { getByText, getByTestId } = render(
        <ThemeProvider theme={theme}>
            <AuthenticationContextProvider>
                <LoginScreen />
            </AuthenticationContextProvider>
        </ThemeProvider>);
    
    expect(getByText("Demo Apps")).toBeTruthy();
    expect(getByTestId("login-screen-email-tid")).toBeTruthy();
    expect(getByTestId("login-screen-password-tid")).toBeTruthy();
    expect(getByTestId("login-screen-login-btn-tid")).toBeTruthy();
    expect(getByTestId("login-screen-back-btn-tid")).toBeTruthy();

})

//Test positive error conditions 
// Conditional rendering testing *****
// test('if error is displayed', async () =>  {
//     const { queryByTestId, getByTestId } = render(
//         <ThemeProvider theme={theme}>
//             <AuthenticationContextProvider>
//                 <LoginScreen props={ Navigation }/>
//             </AuthenticationContextProvider>
//         </ThemeProvider>);
    
//     expect(queryByTestId('login-screen-error')).toBeNull();
//     fireEvent.press(getByTestId('login-screen-login-btn-tid'));
//     const error = getByTestId('login-screen-error');
//     expect( error ).toBeTruthy();
//     // expect(getByTestId("login-screen-password-tid")).toBeTruthy();
//     // expect(getByTestId("login-screen-login-btn-tid")).toBeTruthy();
//     // expect(getByTestId("login-screen-back-btn-tid")).toBeTruthy();
// })