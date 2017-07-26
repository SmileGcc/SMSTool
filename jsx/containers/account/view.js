import React, {PropTypes, Component} from 'react';
import Immutable from 'immutable';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ListView,
    KeyboardAvoidingView,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {Style} from './style';

class AccountView extends Component {
    static propTypes = {
        accountList: PropTypes.instanceOf(Immutable.Map),
        addAccountStatus: PropTypes.bool,
        delAccountStatus: PropTypes.bool,
        selectedAccountId: PropTypes.number
    };

    static defaultProps = {
        accountList: Immutable.Map(),
        addAccountStatus: false,
        delAccountStatus: false,
        selectedAccountId: 0
    };

    constructor(props) {
        super(props);
        let accountDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            showAccountList: false,
            showAddAccount: false,
            smsApiKey: '',
            smsApiSecret: '',
            accountDataSource: accountDs.cloneWithRows([]),
            selectedAccountId: 0
        }
    }

    componentWillMount() {
        this.props.AccountActions.getSelectAccount().then(()=>{
            this.props.AccountActions.getAccount().then(()=>{
                let selectedAccountId = this.props.account.get('selectedAccountId');
                let list = this.props.account.get('accountList');
                let accountList = list.toArray();
                if(accountList.length>0){
                    accountList[selectedAccountId] = accountList[selectedAccountId] + '&&&&&selected';
                }
                this.setState({
                    accountDataSource: this.state.accountDataSource.cloneWithRows(accountList)
                });
            });
        });
    }

    selectAccount = (id) =>{
        this.props.AccountActions.setSelectAccount(id).then(()=>{
            let selectedAccountId = this.props.account.get('selectedAccountId');
            let list = this.props.account.get('accountList');
            let accountList = list.toArray();
            if(accountList.length>0){
                accountList[selectedAccountId] = accountList[selectedAccountId] + '&&&&&selected';
            }
            this.setState({
                accountDataSource: this.state.accountDataSource.cloneWithRows(accountList)
            });
        });
    };

    deleteAccount = (id)=>{
        let accountList = this.props.account.get('accountList').toArray();
        accountList.splice(parseInt(id), 1);
        this.props.AccountActions.deleteAccount(accountList).then(()=>{
            if(this.props.account.get('delAccountStatus')){
                alert('删除账号成功');
                let selectedAccountId = this.props.account.get('selectedAccountId');
                if(id == selectedAccountId){
                    this.props.AccountActions.setSelectAccount(0).then(()=>{
                        let selectedAccountId = this.props.account.get('selectedAccountId');
                        let list = this.props.account.get('accountList');
                        let accountList = list.toArray();
                        if(accountList.length>0){
                            accountList[selectedAccountId] = accountList[selectedAccountId] + '&&&&&selected';
                        }
                        this.setState({
                            accountDataSource: this.state.accountDataSource.cloneWithRows(accountList)
                        });
                    });
                    return;
                }
                let list = this.props.account.get('accountList');
                let accountList = list.toArray();
                accountList[id] = accountList[id] + '&&&&&selected';
                this.setState({
                    accountDataSource: this.state.accountDataSource.cloneWithRows(accountList)
                });
            }else{
                alert('删除账号失败');
            }
        })
    };

    saveAccount = ()=>{
        if(!this.state.smsApiKey){
            return alert('ApiKey不能为空');
        }
        if(!this.state.smsApiSecret){
            return alert('ApiSecret不能为空');
        }
        this.props.AccountActions.addAccount(this.state.smsApiKey, this.state.smsApiSecret).then(()=>{
            if(this.props.account.get('addAccountStatus')){
                alert('保存账号成功');
                let selectedAccountId = this.props.account.get('selectedAccountId');
                let list = this.props.account.get('accountList');
                let accountList = list.toArray();
                accountList[selectedAccountId] = accountList[selectedAccountId] + '&&&&&selected';
                this.setState({
                    accountDataSource: this.state.accountDataSource.cloneWithRows(accountList),
                    showAddAccount: false,
                    smsApiKey: '',
                    smsApiSecret: ''
                });
            }else{
                alert('保存账号失败');
            }
        })
    };

    renderAddAccount = ()=>{
        return(
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.showAddAccount}
                onRequestClose={() => {this.setState({showAddAccount:false})}}>
                <View style={Style.account_add_account}>
                    <View style={Style.account_add_account_content}>
                        <View style={Style.account_add_account_item}>
                            <Text style={Style.account_add_account_key}>APIKey:</Text>
                            <TextInput
                                value={this.state.smsApiKey}
                                onChangeText={(text) => {
                                  this.setState({smsApiKey:text});
                                }}
                                ref="keyTextInput"
                                underlineColorAndroid="transparent"
                                style={Style.account_add_account_value}/>
                        </View>
                        <View style={Style.account_add_account_item}>
                            <Text style={Style.account_add_account_key}>APISecret:</Text>
                            <TextInput
                                value={this.state.smsApiSecret}
                                onChangeText={(text) => {
                                  this.setState({smsApiSecret:text});
                                }}
                                ref="secretTextInput"
                                underlineColorAndroid="transparent"
                                style={Style.account_add_account_value}/>
                        </View>
                        <View style={Style.account_add_account_footer}>
                            <TouchableOpacity onPress={() => {this.setState({showAddAccount:false})}}>
                                <View style={Style.account_add_button}>
                                    <Text>取消</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.saveAccount()}}>
                                <View style={Style.account_add_button}>
                                    <Text>保存账号</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    };

    render() {
        return (
            <View style={Style.account_container}>
                <View style={Style.account_list_add}>
                    <TouchableOpacity onPress={() => {this.setState({showAddAccount:true})}}>
                        <Text style={{color: 'red'}}>添加账号</Text>
                    </TouchableOpacity>
                </View>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.accountDataSource}
                    renderHeader={() =>{
                        return(
                            <View>
                                <View style={Style.account_list_line}/>
                                <View style={Style.account_list}>
                                    <View style={Style.account_list_id}>
                                        <Text>序号</Text>
                                    </View>
                                    <View style={Style.account_list_item_line}/>
                                    <View style={Style.account_list_key}>
                                        <Text>API Key</Text>
                                    </View>
                                    <View style={Style.account_list_item_line}/>
                                    <View style={Style.account_list_secret}>
                                        <Text>API Secret</Text>
                                    </View>
                                    <View style={Style.account_list_item_line}/>
                                    <View style={Style.account_list_delete}>
                                        <Text>操作</Text>
                                    </View>
                                </View>
                                <View style={Style.account_list_line}/>
                            </View>
                        )
                    }}
                    renderRow={(rowData, sectionID, rowID) =>{
                        console.log(rowData);
                        rowData = rowData.split('&&&&&');
                        let style = {color: 'black'};
                        if(rowData[2] && rowData[2] == 'selected'){
                            style = {color: 'red'};
                        }
                        return(
                             <TouchableOpacity onPress={this.selectAccount.bind(this,rowID)}>
                                <View>
                                    <View style={Style.account_list}>
                                        <View style={Style.account_list_id}>
                                            <Text style={style}>{rowID}</Text>
                                        </View>
                                        <View style={Style.account_list_item_line}/>
                                        <View style={Style.account_list_key}>
                                            <Text style={style}>{rowData[0]}</Text>
                                        </View>
                                        <View style={Style.account_list_item_line}/>
                                        <View style={Style.account_list_secret}>
                                            <Text style={style}>{rowData[1]}</Text>
                                        </View>
                                        <View style={Style.account_list_item_line}/>
                                        <View style={Style.account_list_delete}>
                                            <TouchableOpacity onPress={this.deleteAccount.bind(this, rowID)}>
                                                <Text style={{color: 'red'}}>删除</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={Style.account_list_line}/>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                {
                    this.renderAddAccount()
                }
            </View>
        );
    }
}


export default AccountView;

