import { connect } from 'react-redux';

export default connect(state => ({ baseUrl: state.app.launchParams.BASEURL }));
