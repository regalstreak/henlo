import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput, FlatList } from 'react-native';


class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text style={{ color: textColor }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}



export default class GroupPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            selects: [{ key: 'asdsa' }, { key: 'asdasfdsfsa' }, { key: 'asdasa' }, { key: 'bssdsadg' }],
            filteredSelects: [{ key: 'asdsa' }, { key: 'asdasfdsfsa' }, { key: 'asdasa' }, { key: 'bssdsadg' }],
            selectText: '',
        };
    }

    _handleTouchable = (whichFeedback) => {
        switch (whichFeedback) {
            case 'active': {
                this.setState({ active: true });
                break;
            }
            case 'blur': {
                this.setState({ active: false });
                break;
            }
            default: {
                break;
            }
        }
    }

    _handleTextChange = (text) => {
        this.setState({ selectText: text });
        let found = this.state.selects.filter((element) => {
            return element.key.toLowerCase().includes(text.toLowerCase());
        });
        this.setState({ filteredSelects: found });
    }

    _onPressItem = (item) => {
        console.log('asdasdas');
        this.setState({ selectText: item });
        console.log('asdasdas', item);
        this._handleTouchable('blur');
    };

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this._onPressItem(item.key)}>
            <View style={{padding: 20}}>
                <Text>{item.key}</Text>
            </View>
        </TouchableOpacity>
    );


    render() {
        let dropdown;
        if (this.state.active) {
            dropdown =
                <View
                    style={styles.flatList}
                >

                    <FlatList
                        data={this.state.filteredSelects}
                        renderItem={this._renderItem}
                    />
                </View>;
        } else {
            dropdown = null;
        }




        return (
            <View style={styles.container} >
                <TextInput
                    onFocus={() => this._handleTouchable('active')}
                    // onBlur={() => this._handleTouchable('blur')}
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
        zIndex: 100,
    },
});
