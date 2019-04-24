import React from 'react';
import { BackHandler, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import NavigationService from '../services/navigationService';
import { Font } from 'expo';
import { stringify } from 'qs';
const uri = "https://api.parliament.uk/";
const mpall = "query/house_current_members.json?house_id=1AFu55Hs";
const parties = "query/house_current_parties.json?house_id=1AFu55Hs";
const mpbyparty = "query/house_party_current_members.json?house_id=1AFu55Hs&party_id=";
const bodies = "query/laying_body_index.json";
export default class LoadingScreen extends React.Component {
    _store = async (data, key) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        }
        catch (error) {
            console.log("ERROR when storing");
            console.log(error);
            throw (error);
        }
    }

    _pstore = (data, key) => {
        return AsyncStorage.setItem(key, JSON.stringify(data));
    }
    componentDidMount() {
        Font.loadAsync({ 'LucidaGrande': require("../assets/fonts/LucidaGrande.ttf") })
        checkMultiPermissions().then(response => {
            if (response) {
                this.timeoutHandle = setTimeout(() => {
                    this.moveOn()
                }, 2000);
            }
            else {
                this.timeoutHandle = setTimeout(() => {
                    BackHandler.exitApp();
                }, 5000);

            }
        })

    }
    async moveOn() {
        var promises = [];
        var a = this.get(parties); //Set promise on getting party list
        a.then(response => response.json()) //Resolve Promise
            .then(async (json) => {
                try {

                    var b = [];
                    var y = json["@graph"];

                    //extract party names and its relevant JSON-LD key
                    for (var i = 0; i < y.length; i++) {
                        var item = y[i]
                        if (item["partyName"]) {
                            b.push([item["@id"], item["partyName"], item["count"]]);
                        }
                    }
                    AsyncStorage.setItem("PARTIES", JSON.stringify(b), (error) => {
                        console.log(error);
                    }); //Store the party data array
                    //Loop through our party array, foreach party: create and resolve a promise on retrieving its full member list
                    //Then create a promise to be resolved later to store this party list

                    for (var i = 0; i < b.length; i++) {
                        var key = b[i][0];
                        var party = b[i][1];
                        //console.log(key + " " + party);
                        var a = await this.get(mpbyparty + key).then((response) => response.json());
                        promises.push(AsyncStorage.setItem(party, JSON.stringify(a))); //Promise to store data
                        /*a.then(response => response.json())
                            .then(json => {
                                promises.push(AsyncStorage.setItem(party, JSON.stringify(json))); //Promise to store data
                            })
                            .catch((error) => {
                                console.log(error);
                            })*/
                    }

                    //Resolve all our promises on storage
                    Promise.all(promises).then(async (result) => {
                        var m = await AsyncStorage.getAllKeys();
                        console.log(m);
                    });

                }
                catch (err) {
                    console.log(err);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        var b = this.get(bodies);
        b.then((response) => response.json())
            .then(async (json) => {
                var bdata = json["@graph"];
                var bodies = [];
                for (var i = 0; i < bdata.length; i++) {
                    var x = bdata[i];
                    bodies.push([x["@id"], x["groupname"]]);
                }
                await AsyncStorage.setItem("BODIES", JSON.stringify(bodies), (error) => {
                    console.log(error);
                });
            })

        NavigationService.navigateAndReset("Login");
    }
    get(url) {
        return fetch(uri + url);
    }
    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loadingggggg!</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

async function checkMultiPermissions() {
    const { Permissions } = Expo;
    const { status, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    console.log(status);
    console.log(permissions);
    if (status !== 'granted') {
        alert('Hey! You need to enable camera permissions for this app to work. Please enable camera permissions from settings or re-install this App!');
        return true;
    }
    else {
        return true;
    }
}