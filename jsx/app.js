'use strict';

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import configure from './store/configure';
import {
    Main
} from './containers';

const store = configure();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="root">
                        <Scene
                            key="main"
                            title="SMSTool"
                            component={Main}
                        />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default App;



