import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AccountActions} from './state';

import AccountView from './view';

export default connect(
    state => ({
        account: state.get('account')
    }),
    dispatch => {
        return {
            AccountActions: bindActionCreators(AccountActions, dispatch)
        };
    }
)(AccountView);