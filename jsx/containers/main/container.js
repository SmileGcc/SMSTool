import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MainActions} from './state';
import {AccountActions} from '../account/state';

import MainView from './view';

export default connect(
    state => ({
        main: state.get('main'),
        account: state.get('account')
    }),
    dispatch => {
        return {
            MainActions: bindActionCreators(MainActions, dispatch),
            AccountActions: bindActionCreators(AccountActions, dispatch)
        };
    }
)(MainView);