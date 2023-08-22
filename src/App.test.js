import { render, screen, wait, fireEvent } from "@testing-library/react";
import App from "./App";

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
});
