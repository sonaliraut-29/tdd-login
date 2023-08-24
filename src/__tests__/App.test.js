import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import "@testing-library/jest-dom";

const mockAxios = new MockAdapter(axios);

describe("<App />", () => {
  it("Should render the app login view", () => {
    render(<App />);
    expect(screen.getByTestId("app")).toMatchSnapshot();
  });

  it("Should render include input as username and password", () => {
    render(<App />);
    const loginButton = screen.getByTestId("login-button");

    expect(screen.getByTestId("input-username")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should show no error values when page is been loaded", () => {
    render(<App />);

    expect(screen.queryByTestId("password-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
  });

  it("should show error for invalid email", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "user@" },
    });

    expect(screen.getByTestId("email-error")).toHaveTextContent(
      "Email is required or invalid"
    );

    expect(screen.getByTestId("login-button")).toBeDisabled();
  });

  it("should show error for invalid password", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: "user" },
    });

    expect(screen.getByTestId("password-error")).toHaveTextContent(
      "Password is required or wrong"
    );

    expect(screen.getByTestId("login-button")).toBeDisabled();
  });

  it("should show error for empty value of email", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: " " },
    });

    expect(screen.getByTestId("email-error")).toHaveTextContent(
      "Email is required or invalid"
    );

    expect(screen.getByTestId("login-button")).toBeDisabled();
  });

  it("should show error for empty value of password", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: " " },
    });

    expect(screen.getByTestId("password-error")).toHaveTextContent(
      "Password is required or wrong"
    );

    expect(screen.getByTestId("login-button")).toBeDisabled();
  });

  it("should not show error for valid password text input", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: "user@123" },
    });

    expect(screen.queryByTestId("password-error")).not.toBeInTheDocument();
  });

  it("should not show error for valid email text input", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "user@gmail.com" },
    });

    expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
  });

  it("should enable login button for valid email and password", () => {
    render(<App />);

    const emailInput = screen.getByTestId("input-email");
    const passwdInput = screen.getByTestId("input-password");
    const loginBtn = screen.queryByTestId("login-button");

    fireEvent.change(emailInput, {
      target: { value: "user@local.com" },
    });

    fireEvent.change(passwdInput, {
      target: { value: "user@123" },
    });

    expect(loginBtn.getAttribute("disabled")).toBe(null);
  });

  it("should be able to submit form", () => {
    render(<App />);

    const emailInput = screen.getByTestId("input-email");
    const passwdInput = screen.getByTestId("input-password");
    const loginBtn = screen.queryByTestId("login-button");

    fireEvent.change(emailInput, {
      target: { value: "user@local.com" },
    });

    fireEvent.change(passwdInput, {
      target: { value: "user@123" },
    });

    fireEvent.click(loginBtn);
  });

  it("should be able to get error if request fails", async () => {
    const responseData = { token: "yourAccessToken" };
    mockAxios.onPost("/api/login").reply(200, responseData);

    render(<App />);

    const emailInput = screen.getByTestId("input-email");
    const passwdInput = screen.getByTestId("input-password");
    const loginBtn = screen.queryByTestId("login-button");

    fireEvent.change(emailInput, {
      target: { value: "user@local.com" },
    });

    fireEvent.change(passwdInput, {
      target: { value: "user@123" },
    });

    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByText("Login successful")).toBeInTheDocument();
    });
  });
});
