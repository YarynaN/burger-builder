import React from 'react';
import { configure, shallow } from 'enzyme';
import ReactSeventeenAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import BuildControls from './BuildControls';

configure({adapter: new ReactSeventeenAdapter});

describe('BuildControls', () => {
    let wrapper;

    beforeEach(()=> {
        wrapper = shallow(<BuildControls price={20} disabledRemove={true}/>);
    });

    it('should propose to sign in if not authenticated', function () {
        wrapper.setProps({ isAuthenticated: false });
        expect(wrapper.find('.OrderButton').text()).toBe('Signup to Order')
    });
})