import React from "react";
import { AccountScreen } from "../account.screen";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../../../infrastructure/theme";

afterEach(cleanup);

//SNAPSHOT test
test('it renders all elements as expected', () => {
    const { toJSON } = render(
        <ThemeProvider theme={theme}>
            <AccountScreen />
        </ThemeProvider>);
    expect(toJSON()).toMatchSnapshot();
})

//UI test to check all the required elements are present
test('all elements exist', () => {
    const { getByText } = render(
        <ThemeProvider theme={theme}>
            <AccountScreen />
        </ThemeProvider>);
    
    expect(getByText("Demo App")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
    expect(getByText("Register")).toBeTruthy();
})

//Check if login button navigation
// test('if login button navigates', async () => {
//     const { getByText } = render(
//         <ThemeProvider theme={theme}>
//             <AccountScreen />
//         </ThemeProvider>);
    
//     const loginBtn = getByText("Login");
//     fireEvent.press(loginBtn);
//     const newScreen = await findByText('Demo Apps');
//     expect(newScreen).toBeTruthy();
// })
