'use strict';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import 'es6-symbol/implement';
import store from './redux/store';
import Main from './containers/main/container';
import Account from './containers/account/container';
import SendHistory from './containers/sendHistory/container';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="root">
                        <Scene
                            initial
                            key="main"
                            title="SMSTool"
                            component={Main}
                        />
                        <Scene
                            key="account"
                            title="账号设置"
                            component={Account}
                        />
                        <Scene
                            key="sendHistory"
                            title="发送记录"
                            component={SendHistory}
                        />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default App;



