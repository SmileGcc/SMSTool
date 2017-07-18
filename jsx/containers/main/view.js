import React, {PropTypes, Component} from 'react';
import Immutable from 'immutable';
import {
    View,
    Text
} from 'react-native';

class MainView extends Component {
    static propTypes = {
        sendResult: PropTypes.instanceOf(Immutable.Map)
    };

    static defaultProps = {
        sendResult: Immutable.Map()
    };

    constructor(props) {
        super(props);
        this.state = {
            sendResult:{},
            test: ''
        }
    }

    componentWillMount() {
        this.props.MainActions.test('aaaaaa').then(()=>{
            let notices = this.props.main.get('test').get('notices')
            console.log(notices);
            this.setState({test: notices});
        });
    }

    render() {
        return (
            <View>
                <Text>Test111</Text>
                <Text>{this.state.test}</Text>
            </View>
        );
    }
}


export default MainView;

