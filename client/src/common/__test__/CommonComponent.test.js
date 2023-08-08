import { render, screen } from "@testing-library/react";
import Header from "../Header";
import Sidebar from "common/Sidebar";
import DialogWithTitle from "common/DialogWithTitle";
import { renderWithProviders } from "mockProviderRedux/test-utils";
import { BrowserRouter } from "react-router-dom";
//import { ACCOUNT_TYPES } from "constants";

/* To mock constant.js file content */
jest.mock("constants", () => ({
  ACCOUNT_TYPES: {
    STUDENT: "student",
    LECTURER: "lecturer",
    MENTOR: "mentor",
  },
}));

describe("test header sidebar Topbar dialog", () => {
  it("renders header element", () => {
    render(<Header title="View the list of previously submitted projects" />);
    const headerElement = screen.getByText(
      /View the list of previously submitted projects/i
    );
    expect(headerElement).toBeInTheDocument();
  });

  /* Test the dialog title always exists*/
  it("renders dialog with title", () => {
    render(<DialogWithTitle title="Add Score" openDialog={true} />);
    const titleElement = screen.getByText(/add score/i);
    expect(titleElement).toBeInTheDocument();
  });

  /* Test side bar always has initials for account holder */
  it("renders sidebar with initials of the account holder", () => {
    const userData = {
      loading: false,
      logged_in_userId: "2117280000",
      userData: {
        first_name: "John",
        last_name: "Smith",
        role: "student",
      },
      error: "",
      account_type: "student",
    };
    renderWithProviders(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>,
      {
        preloadedState: {
          userInfo: userData,
        },
      }
    );
    const initialsText = screen.getByText(/js/i);
    const accountType = screen.getByText(/student/i);
    const viewTaskTabExist=screen.getByText(/view task/i);
    expect(initialsText).toBeInTheDocument();
    expect(accountType).toBeInTheDocument();
    expect(viewTaskTabExist).toBeInTheDocument();

  });
});
