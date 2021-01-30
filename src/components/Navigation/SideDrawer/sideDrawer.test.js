import React from 'react';
import {configure, shallow} from 'enzyme';
import ReactSeventeenAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import SideDrawer from './SideDrawer';
import Backdrop from '../../UI/Backdrop/Backdrop';

configure({adapter: new ReactSeventeenAdapter});

describe('SideDrawer', () => {
    it('should show backdrop if open', function () {
        let wrapper = shallow(<SideDrawer/>);
        wrapper.setProps({showSidedrawer: true})
        expect(wrapper.find(Backdrop)).toHaveLength(1);
    });
})