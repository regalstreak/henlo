import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';

export default class GroupPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textInputStatus: false,
            selects: [{ key: 'asdsa' }, { key: 'asdasfdsfsa' }, { key: 'asdasa' }, { key: 'bssdsadg' }],
            filteredSelects: [{ key: 'asdsa' }, { key: 'asdasfdsfsa' }, { key: 'asdasa' }, { key: 'bssdsadg' }],
            selectText: '',
        };
    }

    _handleTouchable = (whichFeedback) => {
        this.setState({ textInputStatus: whichFeedback });
    }

    _handleTextChange = (text) => {
        this.setState({ selectText: text });
        let found = this.state.selects.filter((element) => {
            return element.key.toLowerCase().includes(text.toLowerCase());
        });
        this.setState({ filteredSelects: found });
    }

    _onPressItem = (item) => {
        this.setState({ selectText: item }, this._handleTouchable('blur'));
    };

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this._onPressItem(item.key)}>
            <View style={{ padding: 20 }}>
                <Text>{item.key}</Text>
            </View>
        </TouchableOpacity>
    );


    render() {
        let dropdown;
        if (this.state.textInputStatus === 'focus') {
            dropdown =
                <View
                    style={styles.flatList}
                >
                    <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        data={this.state.filteredSelects}
                        renderItem={this._renderItem}
                    />
                </View>;
        } else {
            dropdown = null;
        }

        return (
            <View>
                <TextInput
                    onFocus={() => this._handleTouchable('focus')}
                    onKeyPress={() => this._handleTouchable('focus')}
                    onEndEditing={() => this._handleTouchable('blur')}
                    style={styles.textInput}
                    value={this.state.selectText}
                    onChangeText={(text) => { this._handleTextChange(text); }}
                />
                {dropdown}
                {/* {this.props.children} */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    textInput: {
        borderWidth: 3,
        borderColor: 'black',
        marginTop: 12,
        padding: 16,
        fontSize: 20,
        borderRadius: 0,
    },
    flatList: {
        borderTopWidth: 0,
        borderWidth: 3,
        borderColor: 'black',
        fontSize: 20,
        borderRadius: 0,
        zIndex: 5,
        // marginBottom: 12,

    },
});
