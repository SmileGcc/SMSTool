'use strict';

import React, {PropTypes, Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {MainActions} from '../actions/index';
import {MainCSS} from '../styles/index';

class Main extends Component {

    static propTypes = {
        sendResult: PropTypes.instanceOf(Immutable.Map)
    };

    static defaultProps = {
        sendResult: Immutable.Map()
    };

    constructor(props) {
        super(props);
        this.state = {
            sendResult:{}
        }
    }

    async componentWillMount() {
        this.props.MainActions.sendSMS();
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <View style={MainCSS.container}>
                <Text>Test</Text>
            </View>
        );
    }



}

function mapStateToProps(state, ownProps) {
    return {
        sendResult: state.main.sendResult
    };
}

function mapDispatchToProps(dispatch) {
    return {
        MainActions: bindActionCreators(MainActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);