import React from 'react';
import {
    PermissionsAndroid,
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Contacts from 'react-native-contacts';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
            contactNumbers: '',
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
            // Contacts.getAll((err, contacts) => {
            //     if (err === "denied") {
            //         // error
            //     } else {
            //         console.log(contacts);
            //         this.setState({ contacts });
            //     }
            // });
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


        ourContactNumbers.forEach((currentNumber, index) => {
            let newPerson = {
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
    }



    /* <FlatList
        data={this.state.contacts}
        renderItem={({ item }) => (
            <View>
                <Text >
                    Name: {`${item.givenName} `} Surname: {item.familyName}
                </Text>
                {item.phoneNumbers.map(phone => (
                    <Text >{phone.label} : {phone.number}</Text>
                ))}
            </View>
        )}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index}
    /> */


    render() {
        return (
            <View >
                <View style={styles.henloContainer}>
                    <Text style={styles.henlo}>
                        Henlo,
                    </Text>
                    <Text style={styles.henloText}>
                        Batch me contacts add karlo fren
                    </Text>
                </View>

                <TextInput
                    style={styles.addContactText}
                    onChangeText={this._changeContactsText}
                    placeholder={'Enter one phone number per line'}
                    value={this.state.contactNumbers}
                    multiline={true}
                // keyboardType={"numeric"}
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
                <View style={styles.madeByContainer}>

                    <Text
                        style={styles.madeByText}
                    >Made by yours truly</Text>
                    <Text
                        style={styles.madeByText}
                    >Neil Agarwal</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    addContactText: {
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: 24,
        marginHorizontal: 36,
        padding: 16,
        fontSize: 20,
        borderRadius: 0,
    },
    buttonStyle: {
        backgroundColor: 'black',
        marginHorizontal: 36,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    madeByContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    madeByText: {

    },
    henloContainer: {
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 20,
    },
    henlo: {
        fontSize: 40,
        fontWeight: '600',
    },
    henloText: {
        fontSize: 20,
    },
});
