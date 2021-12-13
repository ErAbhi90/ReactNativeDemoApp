import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { AuthButton, AuthInput } from "../account.styles"
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../../../infrastructure/theme";

afterEach(cleanup);

it('Test click event', () => {
    const mockCallBack = jest.fn();

    const { getByText } = render(
        <ThemeProvider theme={theme}>
            <AuthButton onPress={mockCallBack}>Test</AuthButton>
        </ThemeProvider>
    );
    fireEvent.press(getByText("Test"));
    expect(mockCallBack.mock.calls.length).toEqual(1);

    fireEvent.press(getByText("Test"));
    expect(mockCallBack.mock.calls.length).toEqual(2);
});

// test('renders the passed label', () => {
//     const { queryByText } = render(
//         <ThemeProvider theme={theme}>
//             <AuthInput label="email" />
//         </ThemeProvider>
//     );
//     //Unidentified issue
//     expect(queryByText("email")[0]).not.toBeNull();
// });