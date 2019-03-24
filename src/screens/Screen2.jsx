import React from 'react';
import PropTypes from 'prop-types';

import { showMessageFactory } from '../helpers/show-message';

import withCounter from '../redux/withCounter';

function Screen2({ counter }) {
  return (
    <document>
      <alertTemplate>
        <title style={{ tvTextStyle: 'title1' }}>💃</title>
        <text>And here is a global counter!</text>
        <text style={{ tvTextStyle: 'title2' }}>{counter}</text>
        <button onSelect={showMessageFactory('😏')}>
          <text>🚗</text>
        </button>
      </alertTemplate>
    </document>
  );
}

Screen2.propTypes = {
  counter: PropTypes.number,
};

Screen2.defaultProps = {
  counter: 0,
};

export default withCounter(Screen2);
