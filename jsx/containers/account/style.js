import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

export let Style = StyleSheet.create(
    {
        account_container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff'
        },
        account_list_add:{
            width: 80,
            padding: 10
        },
        account_list: {
            flexDirection: 'row'
        },
        account_list_line: {
            borderWidth:0.5,
            width: '100%',
            borderColor:'#d8d8d8'
        },
        account_list_id: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            paddingTop: 10,
            paddingBottom: 10
        },
        account_list_item_line: {
            borderWidth:0.5,
            height: '100%',
            borderColor:'#d8d8d8'
        },
        account_list_key:{
            alignItems: 'center',
            width: (Dimensions.get('window').width-80)/2,
            padding: 10
        },
        account_list_secret:{
            alignItems: 'center',
            width: (Dimensions.get('window').width-80)/2,
            padding: 10
        },
        account_list_delete: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            paddingTop: 10,
            paddingBottom: 10
        },
        account_add_account: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        account_add_account_content:{
            height: 150,
            width: 250,
            backgroundColor: '#ffffff',
            padding: 10,
            justifyContent: 'center'
        },
        account_add_account_item:{
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            justifyContent: 'flex-end',
            marginRight: 20,
            marginTop:15
        },
        account_add_account_key: {
            marginRight: 5
        },
        account_add_account_value: {
            height: 26,
            borderWidth: 0.5,
            borderColor: '#0f0f0f',
            fontSize: 13,
            padding: 4,
            width: 120
        },
        account_add_account_footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 15
        },
        account_add_button: {
            height: 35,
            width: 80,
            backgroundColor: '#63B8FF',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
);
