import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

export let Style = StyleSheet.create(
    {
        main_container: {
            width: '100%',
            height: '100%',
            paddingLeft: 10,
            backgroundColor: '#ffffff'
        },
        main_key: {
            marginRight: 5
        },
        main_value: {
            height: 26,
            borderWidth: 0.5,
            borderColor: '#0f0f0f',
            fontSize: 13,
            padding: 4
        },
        main_top: {
            flexDirection: 'row',
            marginTop:20,
            marginBottom: 20
        },
        main_top_area_code: {
            flexDirection: 'row'
        },
        main_area_code_value: {
            width: 60
        },
        main_top_telephone: {
            flexDirection: 'row',
            marginLeft: 10
        },
        main_telephone_value: {
            width: 150
        },
        main_middle: {
            flexDirection: 'row'
        },
        main_middle_content: {
            flexDirection: 'row'
        },
        main_content_value: {
            width: 200,
            height: 300,
            textAlignVertical: 'top'
        },
        main_middle_template: {
            marginLeft: 10,
            marginTop: 20,
            height: 35,
            width: 80,
            backgroundColor: '#63B8FF',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        main_footer: {
            alignItems: 'center',
            marginTop: 20
        },
        main_footer_button: {
            height: 40,
            width: 120,
            backgroundColor: '#63B8FF',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        main_template_list: {
            flexDirection: 'row'
        },
        main_template_list_line: {
            borderWidth:0.5,
            width: '100%',
            borderColor:'#d8d8d8'
        },
        main_template_list_id: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            paddingTop: 10,
            paddingBottom: 10
        },
        main_template_list_item_line: {
            borderWidth:0.5,
            height: '100%',
            borderColor:'#d8d8d8'
        },
        main_template_list_content: {
            alignItems: 'center',
            width: Dimensions.get('window').width-80,
            padding: 10
        },
        main_template_list_delete: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            paddingTop: 10,
            paddingBottom: 10
        }
    }
);
