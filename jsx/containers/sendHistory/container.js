import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SendHistoryActions} from './state';

import SendHistoryView from './view';

export default connect(
    state => ({
        sendHistory: state.get('sendHistory')
    }),
    dispatch => {
        return {
            SendHistoryActions: bindActionCreators(SendHistoryActions, dispatch)
        };
    }
)(SendHistoryView);