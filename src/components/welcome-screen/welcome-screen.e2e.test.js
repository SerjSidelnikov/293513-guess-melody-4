import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WelcomeScreen from './welcome-screen';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`WelcomeScreen`, () => {
  it(`Should welcome button be pressed`, () => {
    const onWelcomeButtonHandler = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen
          errorsCount={3}
          onWelcomeButtonClick={onWelcomeButtonHandler}
        />
    );

    const welcomeButton = welcomeScreen.find(`button.welcome__button`);
    welcomeButton.simulate(`click`);

    expect(onWelcomeButtonHandler).toHaveBeenCalledTimes(1);
  });
});
