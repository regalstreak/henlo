import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => {
    return (
        <View style={styles.henloContainer}>
        <Text style={styles.henlo}>
            Henlo,
        </Text>
        <Text style={styles.henloText}>
            Batch me contacts add karlo fren
        </Text>
    </View>
    );
};

const styles = StyleSheet.create({
    henloContainer: {
        marginTop: 30,
        marginBottom: 20,
    },
    mainContainer: {
        marginHorizontal: 6,
    },
    henlo: {
        fontSize: 40,
        fontWeight: '600',
    },
    henloText: {
        fontSize: 20,
    },
});

