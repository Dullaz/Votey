import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList, Button, ActivityIndicator, AsyncStorage, Linking } from 'react-native';
import navigationService from '../../services/navigationService';
import { getRIbyName } from "../assets/RIdataset";
import { getMPs } from "../assets/TWFY.js";
import { Icon } from "react-native-elements";

const uri = "https://api.parliament.uk/query/person_by_id.json?person_id=";

export default class MPProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            item: null,
            RI: null,
            email: null,
            phone: null,
            twitter: null,
            website: null,
            up: 0,
            down: 0,
        }

    }

    componentWillMount() {
        var x = this.props.navigation.getParam("id");
        var y = this.props.navigation.getParam("item");
        var RI = getRIbyName(y.name + " " + y.fname);
        x = y["@id"];
        console.log(y);
        //console.log(RI);
        if (RI) {
            if (RI.category) {
                this.setState({
                    RI: RI
                })
            }

        }
        fetch(uri + x)
            .then((response) => response.json())
            .then((res) => {
                var x = res["@graph"][0]["memberHasParliamentaryIncumbency"]
                for (var i = 0; i < x.length; i++) {
                    if (x[i]["parliamentaryIncumbencyHasContactPoint"]) {
                        x = x[i]["parliamentaryIncumbencyHasContactPoint"];
                        break;
                    }
                }
                console.log(res);
                var email = x["email"]
                var phone = x["phoneNumber"]

                var twitter = res["@graph"][0]["personHasTwitterWebLink"] ? res["@graph"][0]["personHasTwitterWebLink"]["@id"] : "";
                var website = res["@graph"][0]["personHasPersonalWebLink"] ? res["@graph"][0]["personHasPersonalWebLink"]["@id"] : "";

                this.setState({
                    email: email,
                    phone: phone,
                    twitter: twitter,
                    website: website
                })
            });
        this.setState({
            id: x,
            item: y,
        })
    }
    render() {
        var ri;
        var tw;
        var wb;
        if (this.state.RI) {
            ri = <View style={styles.rowbutton}><Text style={styles.rtext}>Registered Interests</Text></View>;
        }
        if (this.state.twitter) {
            console.log(this.state.twitter);
            tw = <TouchableOpacity onPress={() => Linking.openURL(this.state.twitter)} style={styles.rowbutton}><Text style={styles.rtext}>Tweet me</Text></TouchableOpacity>;
        }
        if (this.state.website) {
            wb = <TouchableOpacity onPress={() => Linking.openURL(this.state.website)} style={styles.rowbutton}><Text style={styles.rtext}>Website</Text></TouchableOpacity>;
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {//header photo
                    }
                    <Image source={{ uri: this.state.item.uri }} style={styles.headerimage} resizeMode="contain" />
                </View>
                <View style={styles.details}>
                    <Text>{this.state.up}</Text>
                    <Icon size={34} name="arrow-up-bold" type="material-community" color="green" />
                    <View style={styles.dtext}>
                        <Text>
                            {this.state.item.name + " " + this.state.item.fname + "\n" + this.state.item.con + "\n" + this.state.item.party}
                        </Text>
                    </View>

                    <Icon size={34} name="arrow-down-bold" type="material-community" color="red" />
                    <Text>{this.state.down}</Text>
                </View>
                <View styles={styles.bar}>
                    {
                        //partybar
                    }
                </View>
                <View style={styles.rowcontainer}>
                    {ri}
                    {tw}
                    {wb}
                    <View style={styles.rowbutton}>
                        <Text style={styles.rtext}>Comments</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
    },
    rowcontainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
        backgroundColor: "#efefef",
        flexWrap: "wrap"

    },
    rowbutton: {
        flexDirection: "column",
        justifyContent: "center",
        height: 90,
        width: 90,
        elevation: 2,
        backgroundColor: "white",
        alignItems: "center",
        margin: 10,

    },
    rtext: {
        margin: 5,
        alignSelf: "center"

    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerimage:
    {
        width: "100%",
        height: 200,
    },
    details: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: 10,
        height: 70

    },
    dbutton: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: "red",
    },
    dtext: {
        justifyContent: "center",
        alignItems: "center",
        width: 100,
    },
    bar: {
        width: "100%",
        height: 10,
        backgroundColor: "blue",
        flex: 1
    },
    blist: {

    },
})