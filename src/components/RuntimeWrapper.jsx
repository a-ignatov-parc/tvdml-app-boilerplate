import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import store from '../redux/store';

export default function RuntimeWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

RuntimeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
