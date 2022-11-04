import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Home from "./home.component";

describe("Home component", () => {
  test("displays home component", () => {
    const home = renderHome();
    expect(screen.getByText("SkillScore")).toBeInTheDocument();
  });
  test("displays resume dialog ", async () => {
    const homeScreen = await render(<Home showReturnDialog={true} />, {
      wrapper: BrowserRouter,
    });
    await waitFor(() =>
      expect(screen.getByText("Attention!")).toBeInTheDocument()
    );
    // const resumeButton = screen.getAllByRole("button")[2];
    // act(async()=>{
    //     fireEvent.click(resumeButton);
    //     await screen.debug();
    // })
  });
});

const renderHome = () => {
  return render(<Home />, { wrapper: BrowserRouter });
};
