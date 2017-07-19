import React, {PropTypes, Component} from 'react';
import Immutable from 'immutable';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ListView,
    AsyncStorage,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import {Style} from './style';

class MainView extends Component {
    static propTypes = {
        sendResult: PropTypes.instanceOf(Immutable.Map)
    };

    static defaultProps = {
        sendResult: Immutable.Map()
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let result = ['hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜','hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜','hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜','hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜','hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜','hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜','hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜','hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜','hellotestesetetatestes123456789012345678901234567890',
            '大家好才是好多哈花的发到各昂打工的高档lllfsdag更大的更更多是干暗示过啊啊第三个矮冬瓜']
        this.state = {
            sendResult:{},
            showTemplateList: false,
            dataSource: ds.cloneWithRows([]),
            smsContent: ''
        }
    }

    componentWillMount() {
    }

    sendSMS = ()=>{
        this.blurTextInput();
        AsyncStorage.clear()
    };

    showTemplateList = ()=>{
        this.props.MainActions.getTemplate().then(()=>{
            let list = this.props.main.get('templateList');
            let templateList = list.toArray();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(templateList),
                showTemplateList:true
            });
        });
    };

    selectTemplate = (value)=>{
        this.blurTextInput();
        this.setState({showTemplateList:false, smsContent: value});
    };

    blurTextInput = ()=>{
        this.refs.contentTextInput.blur();
        this.refs.codeTextInput.blur();
        this.refs.phoneTextInput.blur();
    }

    saveTemplate = ()=>{
        this.blurTextInput();
        if(!this.state.smsContent){
            alert('内容不能为空');
        }else{
            this.props.MainActions.addTemplate(this.state.smsContent).then(()=>{
                if(this.props.main.get('addTemplateResult')){
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
            if(this.props.main.get('delTemplateResult')){
                alert('删除模板成功');
                let list = this.props.main.get('templateList');
                let templateList = list.toArray();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(templateList)
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
                    dataSource={this.state.dataSource}
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

    render() {
        return (
            <ScrollView style={Style.main_container}>
                <View style={Style.main_top}>
                    <View style={Style.main_top_area_code}>
                        <Text style={Style.main_key}>区号</Text>
                        <TextInput
                            ref="codeTextInput"
                            underlineColorAndroid="transparent"
                            style={[Style.main_value, Style.main_area_code_value]}/>
                    </View>
                    <View style={Style.main_top_telephone}>
                        <Text style={Style.main_key}>手机号:</Text>
                        <TextInput
                            ref="phoneTextInput"
                            underlineColorAndroid="transparent"
                            style={[Style.main_value, Style.main_telephone_value]}/>
                    </View>
                </View>
                <View style={Style.main_middle}>
                    <View style={Style.main_middle_content}>
                        <Text style={Style.main_key}>内容:</Text>
                        <TextInput
                            ref="contentTextInput"
                            value={this.state.smsContent}
                            onChangeText={(text) => {
                              this.setState({smsContent:text});
                            }}
                            underlineColorAndroid="transparent"
                            style={[Style.main_value, Style.main_content_value]}
                            multiline={true}/>
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
                    </View>
                </View>
                <View style={Style.main_footer}>
                    <TouchableOpacity onPress={this.sendSMS}>
                        <View style={Style.main_footer_button}>
                            <Text>发送短信</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    this.renderTemplateList()
                }
            </ScrollView>
        );
    }
}


export default MainView;

