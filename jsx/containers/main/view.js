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
import {
    Actions
} from 'react-native-router-flux';
import {Style} from './style';

class MainView extends Component {
    static propTypes = {
        sendStatus: PropTypes.bool,
        sendResponse: PropTypes.string,
        templateList: PropTypes.instanceOf(Immutable.Map),
        addTemplateStatus: PropTypes.bool,
        delTemplateStatus: PropTypes.bool,
        selectedAccountId: PropTypes.number,
        accountList: PropTypes.instanceOf(Immutable.Map)
    };

    static defaultProps = {
        sendStatus: false,
        sendResponse: '',
        templateList: Immutable.Map(),
        addTemplateStatus: false,
        delTemplateStatus: false,
        selectedAccountId: 0,
        accountList: Immutable.Map()
    };

    constructor(props) {
        super(props);
        let templateDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            showTemplateList: false,
            templateDataSource: templateDs.cloneWithRows([]),
            smsPhoneCode: '',
            smsTelephone: '',
            smsContent: '',
            smsApiKey: '',
            smsApiSecret: '',
            showAddAccount: false
        }
    }

    componentWillMount() {
        this.props.AccountActions.getSelectAccount().then(()=>{
            this.props.AccountActions.getAccount().then(()=>{
                let id = this.props.account.get('selectedAccountId');
                let list = this.props.account.get('accountList');
                let accountList = list.toArray();
                if(accountList.length == 0){
                    this.setState({
                        showAddAccount: true,
                        smsApiKey: '',
                        smsApiSecret: ''
                    });
                    return
                }
                if(accountList[id]){
                    let account = accountList[id].split('&&&&&');
                    this.setState({
                        smsApiKey: account[0],
                        smsApiSecret: account[1]
                    });
                }
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.account.get('selectedAccountId') != nextProps.account.get('selectedAccountId')
        || this.props.account.get('accountList') != nextProps.account.get('accountList')){
            let id = nextProps.account.get('selectedAccountId');
            let list = nextProps.account.get('accountList');
            let accountList = list.toArray();
            if(accountList.length == 0){
                this.setState({
                    showAddAccount: true,
                    smsApiKey: '',
                    smsApiSecret: ''
                });
                return
            }
            if(accountList[id]){
                let account = accountList[id].split('&&&&&');
                this.setState({
                    smsApiKey: account[0],
                    smsApiSecret: account[1]
                });
            }
        }
    }

    sendSMS = ()=>{
        if(!this.state.smsApiKey){
            alert('账号key不能为空');
            return;
        }
        if(!this.state.smsApiSecret){
            alert('账号Secret不能为空');
            return;
        }
        if(!this.state.smsPhoneCode){
            alert('国际区号不能为空');
            return;
        }
        if(!this.state.telephone){
            alert('手机号码不能为空');
            return;
        }
        if(!this.state.smsContent){
            alert('短信内容不能为空');
            return;
        }
        let toPhone = this.state.smsPhoneCode + this.state.telephone,
            smsApiKey = this.state.smsApiKey,
            smsApiSecret = this.state.smsApiSecret,
            smsContent = this.state.smsContent;
        this.props.MainActions.sendSMS(smsApiKey, smsApiSecret,toPhone, smsContent).then(()=>{
            if(this.props.main.get('sendStatus')){
                alert('短信发送成功');
            }else{
                let error = '短信发送失败, Error:' + this.props.main.get('sendResponse');
                alert(error);
            }
        });
    };

    showTemplateList = ()=>{
        this.props.MainActions.getTemplate().then(()=>{
            let list = this.props.main.get('templateList');
            let templateList = list.toArray();
            this.setState({
                templateDataSource: this.state.templateDataSource.cloneWithRows(templateList),
                showTemplateList:true
            });
        });
    };

    selectTemplate = (value)=>{
        this.setState({showTemplateList:false, smsContent: value});
    };

    saveTemplate = ()=>{
        if(!this.state.smsContent){
            alert('内容不能为空');
        }else{
            this.props.MainActions.addTemplate(this.state.smsContent).then(()=>{
                if(this.props.main.get('addTemplateStatus')){
                    alert('保存模板成功');
                }else{
                    alert('保存模板失败');
                }
            })
        }
    };

    deleteTemplate = (id)=>{
        let templateList = this.props.main.get('templateList').toArray();
        templateList.splice(parseInt(id), 1);
        this.props.MainActions.deleteTemplate(templateList).then(()=>{
            if(this.props.main.get('delTemplateStatus')){
                alert('删除模板成功');
                let list = this.props.main.get('templateList');
                let templateList = list.toArray();
                this.setState({
                    templateDataSource: this.state.templateDataSource.cloneWithRows(templateList)
                });
            }else{
                alert('删除模板失败');
            }
        })
    };

    renderTemplateList = ()=>{
        return(
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.showTemplateList}
                onRequestClose={() => {this.setState({showTemplateList:false})}}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.templateDataSource}
                    renderHeader={() =>{
                        return(
                            <View>
                                <View style={Style.main_template_list_delete}>
                                    <TouchableOpacity onPress={() => {this.setState({showTemplateList:false})}}>
                                        <Text style={{color: 'red'}}>退出</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={Style.main_template_list_line}/>
                                <View style={Style.main_template_list}>
                                    <View style={Style.main_template_list_id}>
                                        <Text>序号</Text>
                                    </View>
                                    <View style={Style.main_template_list_item_line}/>
                                    <View style={Style.main_template_list_content}>
                                        <Text>模板</Text>
                                    </View>
                                    <View style={Style.main_template_list_item_line}/>
                                    <View style={Style.main_template_list_delete}>
                                        <Text>操作</Text>
                                    </View>
                                </View>
                                <View style={Style.main_template_list_line}/>
                            </View>
                        )
                    }}
                    renderRow={(rowData, sectionID, rowID) =>
                    <TouchableOpacity onPress={this.selectTemplate.bind(this,rowData)}>
                        <View>
                            <View style={Style.main_template_list}>
                                <View style={Style.main_template_list_id}>
                                    <Text>{rowID}</Text>
                                </View>
                                <View style={Style.main_template_list_item_line}/>
                                <View style={Style.main_template_list_content}>
                                    <Text>{rowData}</Text>
                                </View>
                                <View style={Style.main_template_list_item_line}/>
                                <View style={Style.main_template_list_delete}>
                                    <TouchableOpacity onPress={this.deleteTemplate.bind(this, rowID)}>
                                        <Text style={{color: 'red'}}>删除</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={Style.main_template_list_line}/>
                        </View>
                    </TouchableOpacity>
                    }
                />
            </Modal>
        )
    };

    showAccountList = ()=>{
        Actions.account();
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
                this.setState({
                    showAddAccount: false
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
            <ScrollView style={Style.main_container}>
                <View style={Style.main_top}>
                    <View style={Style.main_top_item}>
                        <View style={Style.main_top_left}>
                            <Text style={Style.main_key}>APIKey:</Text>
                            <TextInput
                                value={this.state.smsApiKey}
                                editable={false}
                                underlineColorAndroid="transparent"
                                style={[Style.main_value, Style.main_area_code_value]}/>
                        </View>
                        <View style={Style.main_top_right}>
                            <Text style={Style.main_key}>APISecret:</Text>
                            <TextInput
                                value={this.state.smsApiSecret}
                                editable={false}
                                underlineColorAndroid="transparent"
                                style={[Style.main_value, Style.main_area_code_value]}/>
                        </View>
                    </View>
                    <View style={Style.main_top_item}>
                        <TouchableOpacity onPress={this.showAccountList}>
                            <View style={Style.main_top_setting}>
                                <Text>账号设置</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={Style.main_top_item}>
                        <View style={Style.main_top_left}>
                            <Text style={Style.main_key}>区号</Text>
                            <TextInput
                                value={this.state.smsPhoneCode}
                                onChangeText={(text) => {
                                  this.setState({smsPhoneCode:text});
                                }}
                                ref="codeTextInput"
                                underlineColorAndroid="transparent"
                                style={[Style.main_value, Style.main_area_code_value]}/>
                        </View>
                        <View style={Style.main_top_right}>
                            <Text style={Style.main_key}>手机号:</Text>
                            <TextInput
                                value={this.state.telephone}
                                onChangeText={(text) => {
                              this.setState({telephone:text});
                            }}
                                ref="phoneTextInput"
                                underlineColorAndroid="transparent"
                                style={[Style.main_value, Style.main_telephone_value]}/>
                        </View>
                    </View>
                </View>
                <View style={Style.main_middle}>
                    <View style={Style.main_middle_content}>
                        <Text style={Style.main_key}>内容:</Text>
                        <TextInput
                            multiline={true}
                            ref="contentTextInput"
                            value={this.state.smsContent}
                            onChangeText={(text) => {
                              this.setState({smsContent:text});
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={(event) => {
                                this.setState({smsContent:event.nativeEvent.text + '\n'});
                            }}
                            underlineColorAndroid="transparent"
                            style={[Style.main_value, Style.main_content_value]}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.showTemplateList}>
                            <View style={Style.main_middle_template}>
                                <Text>模板选择</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.saveTemplate}>
                            <View style={Style.main_middle_template}>
                                <Text>保存模板</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.sendSMS}>
                            <View style={Style.main_middle_template}>
                                <Text>发送短信</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.renderTemplateList()
                }
                {
                    this.renderAddAccount()
                }
            </ScrollView>
        );
    }
}


export default MainView;

