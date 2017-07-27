import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

export let Style = StyleSheet.create(
    {
        send_history_container: {
            backgroundColor: '#ffffff'
        },
        send_history_list:{
            flexDirection: 'row'
        },
        send_history_list_left: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 40
        },
        send_history_list_right: {
            width: Dimensions.get('window').width-40
        },
        send_history_list_item:{
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        send_history_list_item_item:{
            alignItems: 'center',
            justifyContent: 'center',
            width: (Dimensions.get('window').width-40)/2,
            margin: 5
        },
        send_history_list_content: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 10
        },
        send_history_list_line: {
            borderWidth:0.5,
            width: '100%',
            borderColor:'#d8d8d8'
        },
        send_history_list_line1: {
            borderWidth:0.5,
            height: '100%',
            borderColor:'#d8d8d8'
        }


    }
);
