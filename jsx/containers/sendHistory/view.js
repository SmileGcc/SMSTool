import React, {PropTypes, Component} from 'react';
import Immutable from 'immutable';
import {
    View,
    Text,
    TouchableOpacity,
    ListView
} from 'react-native';
import {Style} from './style';

class SendHistoryView extends Component {
    static propTypes = {
        sendHistoryList: PropTypes.instanceOf(Immutable.List),
        addSendHistoryStatus: PropTypes.bool
    };

    static defaultProps = {
        sendHistoryList: Immutable.List(),
        addSendHistoryStatus: false
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }

    componentWillMount() {
        this.props.SendHistoryActions.getSendHistory().then(()=>{
            let list = this.props.sendHistory.get('sendHistoryList');
            let accountList = list.toArray().reverse();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(accountList)
            });
        });
    }

    render() {
        return (
            <View style={Style.send_history_container}>
                <ListView
                    showsHorizontalScrollIndicator={true}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    overScrollMode='always'
                    renderHeader={() =>{
                        return(
                            <View>
                                <View style={Style.send_history_list_line}/>
                                <View style={Style.send_history_list}>
                                    <View style={Style.send_history_list_left}>
                                        <Text>id</Text>
                                    </View>
                                    <View style={Style.send_history_list_line1}/>
                                    <View style={Style.send_history_list_right}>
                                        <View style={Style.send_history_list_item}>
                                            <View style={Style.send_history_list_item_item}>
                                                <Text>Api Key</Text>
                                            </View>
                                            <View style={Style.send_history_list_item_item}>
                                                <Text>Api Secret</Text>
                                            </View>
                                        </View>
                                         <View style={Style.send_history_list_line}/>
                                         <View style={Style.send_history_list_item}>
                                            <View style={Style.send_history_list_item_item}>
                                                <Text>手机号码</Text>
                                            </View>
                                            <View style={Style.send_history_list_item_item}>
                                                <Text>发送时间</Text>
                                            </View>
                                        </View>
                                         <View style={Style.send_history_list_line}/>
                                        <View style={Style.send_history_list_content}>
                                            <Text>内容</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={Style.send_history_list_line}/>
                            </View>
                        )
                    }}
                    renderRow={(rowData, sectionID, rowID) =>{
                        rowData = rowData.split('&&&&&');
                        return(
                             <View>
                                <View style={Style.send_history_list_line}/>
                                <View style={Style.send_history_list}>
                                    <View style={Style.send_history_list_left}>
                                        <Text>{rowID}</Text>
                                    </View>
                                    <View style={Style.send_history_list_line1}/>
                                    <View style={Style.send_history_list_right}>
                                        <View style={Style.send_history_list_item}>
                                            <View style={Style.send_history_list_item_item}>
                                                <Text>{rowData[0]}</Text>
                                            </View>
                                            <View style={Style.send_history_list_item_item}>
                                                <Text>{rowData[1]}</Text>
                                            </View>
                                        </View>
                                         <View style={Style.send_history_list_line}/>
                                         <View style={Style.send_history_list_item}>
                                            <View style={Style.send_history_list_item_item}>
                                                <Text>{rowData[2]}</Text>
                                            </View>
                                            <View style={Style.send_history_list_item_item}>
                                                <Text>{rowData[4]}</Text>
                                            </View>
                                        </View>
                                         <View style={Style.send_history_list_line}/>
                                        <View style={Style.send_history_list_content}>
                                            <Text>{rowData[3]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={Style.send_history_list_line}/>
                            </View>
                        )
                    }}
                />
            </View>
        );
    }
}


export default SendHistoryView;

