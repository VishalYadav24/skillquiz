import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ResponsiveDrawer from "./drawer.component";
import toJson from 'enzyme-to-json';

// describe("snapshot test",()=>{
//     beforeAll(() => {
//         ReactDOM.createPortal = jest.fn((element, node) => {
//           return element
//         })
//       })
    
//       afterEach(() => {
//         ReactDOM.createPortal.mockClear()
//       })
//     test("snapshot drawer",()=>{
//         const tree = toJson(renderer.create(<ResponsiveDrawer/>));
//         expect(tree).toMatchSnapshot();
//     })
// })