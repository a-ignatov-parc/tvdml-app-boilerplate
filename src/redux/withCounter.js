import { connect } from 'react-redux';

export default connect(state => ({ counter: state.counter }));
