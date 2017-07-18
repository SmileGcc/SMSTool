import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MainActions} from '../main/state';

import MainView from './view';

export default connect(
    state => ({
        main: state.get('main')
    }),
    dispatch => {
        return {
            MainActions: bindActionCreators(MainActions, dispatch)
        };
    }
)(MainView);