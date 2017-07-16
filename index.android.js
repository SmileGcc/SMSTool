'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import App from './jsx/app';

class SMSTool extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('SMSTool', () => SMSTool);

