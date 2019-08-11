import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => {
    return (
        <View style={styles.madeByContainer}>

            <Text style={styles.madeByText}>
                Made by yours truly
            </Text>
            <Text style={styles.madeByText}>
                Neil Agarwal
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    madeByContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    madeByText: {

    },
});

