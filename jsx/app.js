'use strict';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import 'es6-symbol/implement';
import store from './redux/store';
import Main from './containers/main/container';
import Account from './containers/account/container';

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
                            title="SMSTool"
                            component={Account}
                        />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default App;



