import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPrefix } from '../store/actions';

class GroupPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textInputStatus: false,
            filteredSelects: [],
            selectText: '',
        };

        this.state.filteredSelects = this.props.main.prefixes;
    }


    _handleTouchable = (whichFeedback) => {
        if (this.props.getPrefix) {
            this.props.getPrefix(this.state.selectText);
        }

        this.setState({ textInputStatus: whichFeedback });
    }

    _handleTextChange = (text) => {
        this.setState({ selectText: text });
        let reduxPrefixes = this.props.main.prefixes;
        if (reduxPrefixes.length > 0) {
            let found = reduxPrefixes.filter((element) => {
                return element.toLowerCase().includes(text.toLowerCase());
            });
            this.setState({ filteredSelects: found });
        }

        // if (!found.includes(text)) {
        //     this.setState({ selects: this.state.selects.concat(text) });
        // }
    }

    _onPressItem = (item) => {
        this.setState({ selectText: item }, this._handleTouchable('blur'));
    };

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this._onPressItem(item)}>
            <View style={{ padding: 20 }}>
                <Text>{item}</Text>
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
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>;
        } else {
            dropdown = null;
        }

        return (
            <View>
                <TextInput
                    maxLength={12}
                    onFocus={() => this._handleTouchable('focus')}
                    onKeyPress={() => this._handleTouchable('focus')}
                    onEndEditing={() => this._handleTouchable('blur')}
                    placeholder={'Enter your group prefix'}
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
        borderWidth: 1.6,
        borderColor: 'black',
        marginTop: 12,
        padding: 16,
        fontSize: 20,
        borderRadius: 0,
    },
    flatList: {
        borderTopWidth: 0,
        borderWidth: 1.6,
        borderColor: 'black',
        fontSize: 20,
        borderRadius: 0,
        zIndex: 5,
        // marginBottom: 12,

    },
});


const mapStateToProps = (state) => {
    const { main } = state;
    return { main };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addPrefix,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupPicker);
