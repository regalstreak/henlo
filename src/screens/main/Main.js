import React from 'react';
import {
    PermissionsAndroid, View, TextInput, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

import Contacts from 'react-native-contacts';

import Footer from '../../library/components/Footer';
import Header from '../../library/components/Header';
import CheckBoxSwitch from '../../library/components/CheckBoxSwitch';
import GroupPicker from '../../library/components/GroupPicker';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
            contactNumbers: '',
            contactOption: 'single',
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

        if (this.state.contactOption === 'single') {
            newPerson = {
                note: 'henloContact',
                givenName: 'aaaa_' + 'contact',
                phoneNumbers: [],
            };
            ourContactNumbers.forEach((currentNumber, index) => {
                newPerson.phoneNumbers.push({
                    label: 'mobile',
                    number: currentNumber,
                });
            });

            Contacts.addContact(newPerson, (err) => {
                if (err) { throw err; }
            });

        } else if (this.state.contactOption === 'multiple') {
            ourContactNumbers.forEach((currentNumber, index) => {
                newPerson = {
                    note: 'henloContact',
                    phoneNumbers: [{
                        label: 'mobile',
                        number: currentNumber,
                    }],
                    givenName: 'aaaa_' + index + '_contact',
                };

                Contacts.addContact(newPerson, (err) => {
                    if (err) { throw err; }
                });

            });
        } else {
            console.log('CONTACT OPTION ERROR');
        }


    }

    _getContactOption = (contactOption) => {
        this.setState({ contactOption });
    }


    render() {

        return (
            <View style={styles.container} >

                <Header />

                <View style={styles.mainContainer}>


                    <GroupPicker>
                    </GroupPicker>

                    <CheckBoxSwitch onChange={this._getContactOption} />

                    <TextInput
                        style={styles.addContactText}
                        onChangeText={this._changeContactsText}
                        placeholder={'Enter one phone number per line'}
                        value={this.state.contactNumbers}
                        multiline={true}
                    />

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this._addContactsPressed}
                        color="#000000"
                    >

                        <Text
                            style={styles.buttonTextStyle}
                        >ADD CONTACTS LMAO</Text>
                    </TouchableOpacity>

                    <Footer />

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
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: 24,
        padding: 16,
        fontSize: 20,
        borderRadius: 0,
    },

    buttonStyle: {
        backgroundColor: 'black',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
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
});
