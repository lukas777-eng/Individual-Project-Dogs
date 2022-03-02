import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import LandingDog from "../components/landingDog";
import { Link } from 'react-router-dom'; 

configure({ adapter: new Adapter() });

describe("<LandingDog />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LandingDog />);
  });

  it("deberia renderizar e1 componente <Link />", () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });
  it('El primer Link debe tener el texto "Login" ', () => {
    expect(wrapper.find(Link).at(0).text()).toEqual("Login");
  });
});