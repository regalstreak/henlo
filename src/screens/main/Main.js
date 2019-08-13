import React from 'react';
import {
    PermissionsAndroid, View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';

import Contacts from 'react-native-contacts';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPrefix } from "../../library/store/actions";

import Footer from '../../library/components/Footer';
import Header from '../../library/components/Header';
import CheckBoxSwitch from '../../library/components/CheckBoxSwitch';
import GroupPicker from '../../library/components/GroupPicker';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
            contactNumbers: '',
            contactOption: 'single',
            prefix: 'aaaa',
            listContacts: [
            ],
        };
    }

    componentDidMount() {
        this._askForPermission();

    }

    _askForPermission() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app wanna view yer contacts',
            }
        ).then(() => {
            /* Contacts.getAll((err, contacts) => {
                 if (err === "denied") {
                     // error
                 } else {
                     console.log(contacts);
                     this.setState({ contacts });
                 }
             }); */
        });
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
                title: 'write contacts',
                message: 'This app wanna write yer contacts',
            }
        ).then(() => {
        });
    }

    _changeContactsText = (text) => {
        this.setState({ contactNumbers: text });
    }

    _addContactsPressed = () => {

        let ourContactNumbers = this.state.contactNumbers.split('\n');
        let newPerson;

        let addContactPromise = new Promise((resolve, reject) => {

            if (this.state.contactOption === 'single') {
                newPerson = {
                    note: 'henloContact',
                    givenName: this.state.prefix + '_henloContact',
                    phoneNumbers: [],
                };
                ourContactNumbers.forEach((currentNumber, index) => {
                    newPerson.phoneNumbers.push({
                        label: 'mobile',
                        number: currentNumber,
                    });
                });

                Contacts.addContact(newPerson, (err) => {
                    if (err) {
                        reject('single');
                        throw err;
                    }
                    else {
                        resolve('single');
                    }
                });

            } else if (this.state.contactOption === 'multiple') {
                ourContactNumbers.forEach((currentNumber, index) => {
                    newPerson = {
                        note: 'henloContact',
                        phoneNumbers: [{
                            label: 'mobile',
                            number: currentNumber,
                        }],
                        givenName: this.state.prefix + '_' + index + '_henloContact',
                    };

                    Contacts.addContact(newPerson, (err) => {
                        if (err) {
                            reject('multiple');
                            throw err;
                        }
                        else {
                            resolve('multiple');
                        }
                    });

                });
            } else {
                reject('contactOptionError');
                console.log('CONTACT OPTION ERROR');
            }
        });

        addContactPromise.then(contactType => {
            Contacts.getContactsMatchingString(this.state.prefix, (error, contacts) => {
                if (error) { throw error; }
                else {
                    this.setState({ listContacts: contacts });
                }
            });
        }).then(() => {
            this.props.addPrefix(this.state.prefix);
            console.log(this.props.main.prefixes)
        });
    }

    _deleteContactsPressed = () => {
        this.state.listContacts.forEach(element => {
            Contacts.deleteContact(element, (err, recordId) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    Contacts.getContactsMatchingString(this.state.prefix, (error, contacts) => {
                        if (error) { throw error; }
                        else {
                            this.setState({ listContacts: contacts, prefix: '' });
                        }
                    });
                }
            });
        });
    }


    _getContactOption = (contactOption) => {
        this.setState({ contactOption });
    }

    _getPrefix = (prefix) => {
        this.setState({ prefix });
    }

    render() {

        let renderContact = ({ item }) => {
            return (
                <View>
                    <View style={styles.renderContactContainer}>
                        <View style={styles.renderContactNameContainer}>
                            <Text style={styles.renderContactName}>{item.givenName.slice(0, 15)}</Text>
                        </View>
                        <View>
                            <Text style={styles.renderContactNumber}>{item.phoneNumbers[0].number}</Text>
                        </View>

                    </View>

                    <View style={styles.renderContactDivider} />
                </View>
            );
        };

        return (
            <View style={styles.container} >

                <Header />
                <View style={styles.mainContainer}>


                    <GroupPicker getPrefix={this._getPrefix} />

                    <CheckBoxSwitch onChange={this._getContactOption} />

                    <TextInput
                        style={styles.addContactText}
                        onChangeText={this._changeContactsText}
                        placeholder={'Enter one phone number per line'}
                        value={this.state.contactNumbers}
                        multiline={true}
                    />

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 4,
                    }}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={this._addContactsPressed}
                            color="#000000"
                        >
                            <Text
                                style={styles.buttonTextStyle}
                            >ADD CONTACTS</Text>
                        </TouchableOpacity>



                        <TouchableOpacity
                            style={styles.buttonStyle2}
                            onPress={this._deleteContactsPressed}
                            color="#000000"
                        >
                            <Text
                                style={styles.button2TextStyle}
                            >DELETE ALL</Text>
                        </TouchableOpacity>

                    </View>

                    <Footer />

                    <FlatList
                        data={this.state.listContacts}
                        renderItem={renderContact}
                        keyExtractor={(item, index) => index.toString()}
                    />


                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
    },
    addContactText: {
        borderWidth: 1.6,
        borderColor: 'black',
        marginVertical: 24,
        padding: 16,
        fontSize: 20,
        borderRadius: 0,
    },

    buttonStyle: {
        flex: 0.5,
        marginRight: 6,
        backgroundColor: 'black',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonStyle2: {
        flex: 0.5,
        marginLeft: 6,
        backgroundColor: 'white',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2.6,
        borderColor: 'black',
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    button2TextStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
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

    renderContactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30,

    },
    renderContactDivider: {
        height: 1,
        backgroundColor: 'black',
    },
    renderContactNameContainer: {
        width: 200,
    },
    renderContactName: {
        fontSize: 20,
    },
    renderContactNumber: {
        fontSize: 16,
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
