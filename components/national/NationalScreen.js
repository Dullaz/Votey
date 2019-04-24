import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import NavigationService from '../../services/navigationService';

export default class NationalScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.go("MPS")} style={[styles.button]}>
                    <Text>MPs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.go("Party")} style={[styles.button]}>
                    <Text>Parties</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => NavigationService.navigate("MPS", { local: true })} style={[styles.button]}>
                    <Text>My MP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.go("ACC")} style={[styles.button]}>
                    <Text>My Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("LOGOUT")} style={[styles.button]}
                ><Text>Logout</Text>
                </TouchableOpacity>

            </View>
        )
    }

    go(loc) {
        NavigationService.navigate(loc);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "40%"
    },
    button: {
        width: 100,
        height: 100,
        margin: 10,
        elevation:3,
        backgroundColor:"#bfd7ff"

    }
});