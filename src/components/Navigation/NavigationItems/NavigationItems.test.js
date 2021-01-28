import React from 'react';
import { configure, shallow } from 'enzyme';
import ReactSeventeenAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavigationItems from "./NavigationItems";
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new ReactSeventeenAdapter()});

describe('<NavigationItems/>', () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<NavigationItems/>);
    });

    it('should render 2 <NavigationItem />', function () {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem /> if authenticated', function () {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should have Logout', function () {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});