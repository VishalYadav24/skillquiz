import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Instructions from "./instructions.component"

describe("Instructions",()=>{
    test("Display Instructions",()=>{
        const instructions = renderInstructions();
        expect(screen.getByTestId("Questions").innerHTML).toBe("Questions");
    })
})


const renderInstructions = ()=>{
    return (
        render(
            <Instructions open={true} isLogined={true}/>,{wrapper:BrowserRouter}
        )
    )
}