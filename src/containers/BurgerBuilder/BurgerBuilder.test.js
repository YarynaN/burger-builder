import React from 'react';
import { configure, shallow } from 'enzyme';
import ReactSeventeenAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter : new ReactSeventeenAdapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);
    })

    it('should render 2 build controls when receiving ingredients', function () {
        wrapper.setProps({ingredients: {'salad': 1, 'meat': 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})

