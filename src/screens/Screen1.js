import PropTypes from 'prop-types';

import { link } from '../utils';
import { showMessageFactory } from '../helpers/show-message';

import withCounter from '../redux/withCounter';

function Screen1(props) {
  const name = props.name;
  const counter = props.counter;

  return (
    <document>
      <head>
        <style>{`
          .title {
            tv-text-style: title1;
          }
        `}</style>
      </head>
      <alertTemplate>
        <title class='title'>Hello {name}!</title>
        <description>Nice to see you 😸</description>
        <button onSelect={link('page2')}>
          <text>🎉</text>
        </button>
        <button onSelect={showMessageFactory('😯')}>
          <text>🍸</text>
        </button>
        <text>And a small counter for your pleasure!</text>
        <text style={{ tvTextStyle: 'title2' }}>
          {counter}
        </text>
      </alertTemplate>
    </document>
  );
}

Screen1.propTypes = {
  name: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};

Screen1.defaultProps = {
  name: 'Human',
  counter: 0,
};

export default withCounter(Screen1);
