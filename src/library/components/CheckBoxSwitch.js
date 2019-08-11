import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class CheckBoxSwitch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contactOption: true,
        };
    }

    _handleContactPress = () => {
        this.setState({ contactOption: !this.state.contactOption },
            () => {
                if (this.props.onChange) {
                    if (this.state.contactOption) {
                        this.props.onChange('single');
                    } else {
                        this.props.onChange('multiple');
                    }
                }
            });
    }

    render() {

        let checkBox, checkBoxInvert;

        if (this.state.contactOption) {
            checkBox = <View style={styles.checkedView} />;
            checkBoxInvert = <View />;
        } else {
            checkBox = <View />;
            checkBoxInvert = <View style={styles.checkedView} />;
        }

        return (
            <View style={styles.container}>
                <View style={styles.optionContainer}>
                    <Text style={styles.text}>
                        Single Contact
                </Text>
                    <TouchableOpacity disabled={this.state.contactOption} style={styles.checkboxContainer} onPress={this._handleContactPress}>
                        {checkBox}
                    </TouchableOpacity>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={styles.text}>
                        Multiple Contacts
                </Text>

                    <TouchableOpacity disabled={!this.state.contactOption} style={styles.checkboxContainer} onPress={this._handleContactPress}>
                        {checkBoxInvert}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionContainer: {
        flexDirection: 'row',
    },
    checkboxContainer: {
        borderColor: 'black',
        borderWidth: 3,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedView: {
        backgroundColor: 'black',
        width: 14,
        height: 14,
    },
    text: {
        fontSize: 16,
        marginRight: 12,
    },
});
