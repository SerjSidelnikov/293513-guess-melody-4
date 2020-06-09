import React from 'react';

import WelcomeScreen from '../welcome-screen/welcome-screen';

const App = ({errorsCount}) => { // eslint-disable-line
  return (
    <>
      <WelcomeScreen errorsCount={errorsCount}/>
    </>
  );
};

export default App;
