import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
export default class ProgressBar extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.node} />
                <View style={styles.pathnode}>
                    <View style={styles.node} />
                    <View style={styles.path} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: "row",
        },
        node: {
            width: 10,
            height: 10,
            borderRadius: 5,
        },
        path: {
            height: 5,
            width: 20
        },
        pathnode: {

        }

    }
)