import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./navbar.component";

describe("Navbar", () => {
  test("should display Navbar", () => {
    const navbar = renderScreen();
    screen.debug();
    expect(screen.getByText("SkillScore").innerHTML).toBe("SkillScore");
  });
  test("should display login button when user is new", () => {
    localStorage.clear();
    const navbar = renderScreen();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
  test("should display logout button when user is has registered", () => {
    const navbar = render(<Navbar isLogined={true} />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
//   test("should  logout  when user choose to logout", () => {
//     const navbar = render(<Navbar isLogined={true} />, {
//       wrapper: BrowserRouter,
//     });
//      const button = screen.getAllByText("Logout")[0];
//      console.log(button)
//     act(()=>{
//         fireEvent.click(button);
//     })
//     expect(localStorage.getItem("User")).toBeNull();
//   });
});

const renderScreen = () => {
  return render(<Navbar />, { wrapper: BrowserRouter });
};

const userInfo = { name: "gfg", email: "cccc@gmail.com", password: "ccc" };
