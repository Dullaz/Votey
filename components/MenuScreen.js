import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import NavigationService from '../services/navigationService';
import * as firebase from "firebase";

export default class MenuScreen extends React.Component {
    render() {
        return (

            <View style={styles.container}>
                <TouchableOpacity style={styles.ground} onPress={() => this.go("ACC")}>
                    <Text style={styles.buttonText}>My Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ground} onPress={() => this.go("ACC")}>
                    <Text style={styles.buttonText}>Constituency</Text>
                </TouchableOpacity>
                <View style={styles.innercontainer}>

                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel={'International'}
                        onPress={() => this.go("International")}
                        style={[styles.circleShape, styles.outer]}>
                        <Image source={require("../assets/earth.png")} style={[styles.circleShape, styles.outer]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel={'National'}
                        onPress={() => this.go("MPS")}
                        style={[styles.circleShape, styles.middle]}>
                        <Image source={require("../assets/flag.png")} style={[styles.circleShape, styles.middle]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel={'Local'}
                        onPress={() => this.go("Login")}
                        style={[styles.circleShape, styles.inner]}>
                        <Image source={require("../assets/default-user.png")} style={[styles.circleShape, styles.inner]} />

                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.ground, { marginBottom: 10 }]} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>LogOut</Text>
                </TouchableOpacity>
            </View>

        )
    }
    go(loc) {
        NavigationService.navigate(loc);
    }
    async logout() {
        try {
            await firebase.auth().signOut();
            this.go("Login");
            // signed out
        } catch (e) {
            // an error
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#edf3ff',
        margin: 0,
    },
    innercontainer:
    {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        flex: 5

    },
    buttonText: {
        color: 'black',
        fontFamily: "LucidaGrande",
    },
    ground: {
        backgroundColor: "white",
        width: 250,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        elevation: 2,
        flex: 0.4,

    },
    circleShape: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    outer: {
        position: 'absolute',
        width: 350,
        height: 350,
        borderRadius: 175,
        backgroundColor: 'transparent'
    },
    middle: {
        position: 'absolute',
        width: 225,
        height: 225,
        borderRadius: 112.5,
        zIndex: 2
    },
    inner: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        zIndex: 3
    }

});