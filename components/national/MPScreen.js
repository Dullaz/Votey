import React from 'react';
import { StyleSheet, Image, Text, View, FlatList, Button, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';
import NavigationService from '../../services/navigationService';
import { SearchBar } from 'react-native-elements';
import * as p2c from "../../services/party2colour";


const uri = "https://api.parliament.uk/";
const memuri = "query/house_current_members.json?house_id=1AFu55Hs";
const picprefix = uri + "photo/";
const picuri = ".jpeg?crop=CU_1:1&width=100&height=100&quality=100";

class MPRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: this.props.item.uri
        };
    }
    go = () => {
        NavigationService.navigate("MPP", { "id": this.props.item.id, item: this.props.item });
    }
    render() {
        return (
            <View style={[styles.MPRow, { borderLeftColor: this.props.item.colour }]}>
                <TouchableOpacity onPress={this.go}>
                    <Image source={{ uri: this.props.item.uri }} onError={() => { this.setState({ uri: require("../../assets/default-user.png").uri }) }} style={styles.MPImg} />
                    <Text style={styles.MPTitle}>
                        {this.props.item.name + " " + this.props.item.fname[0] + "."}
                    </Text>
                    <Text style={styles.MPCon}>
                        {this.props.item.con}
                    </Text>
                    <Text style={styles.MPCon}>
                        {
                            this.props.item.party
                        }
                    </Text>
                </TouchableOpacity>
            </View >
        )
        /*return (
            <View style={{ ...styles.MPRow, backgroundColor: this.state.bg }}>
                <View style={styles.MPTop}>
                    <Image source={this.state.avatar} style={{ width: 50, height: 50, alignSelf: "center" }} />
                    <View style={styles.container}>
                        <Text style={styles.MPTitle}>
                            {this.props.item.personGivenName + " " + this.props.item.personFamilyName}
                        </Text>
                        <Text>
                            {this.state.constituency}
                        </Text>
                        <Text>
                            {this.state.party}
                        </Text>
                    </View>
                </View>
                <View style={styles.container}>

                </View>
            </View >
        )*/

    }
}
export default class MPScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mpjson: null,
            loading: true,
            parties: null,
            search: "",
            filtered: null,
            cparty: "Conservative",
            pos: 0,
        }
    }
    async componentDidMount() {
        try {
            var x = await AsyncStorage.getItem("PARTIES");
            x = JSON.parse(x);
            var b = x;
            this.setState({
                parties: x
            });

            await this.reload();
            //var y = x["@graph"];

            //extract party names and its relevant JSON-LD key
            /*for (var i = 0; i < y.length; i++) {
                var item = y[i]
                if (item["partyName"]) {
                    b.push([item["@id"], item["partyName"], item["count"]]);
                }
            }*/

        }
        catch (err) {
            console.log(err);
        }
    }
    listbuttons() {
        let p = this.state.parties;
        return (
            p.map((val, index) => {
                return (<Button key={val[1]} color={p2c.party2colour(val[1])} title={val[1].substring(0, 2)} onPress={() => {
                    console.log(val[1]);
                    this.setState({
                        cparty: val[1]
                    }, function () {
                        this.reload();
                    });
                }} />

                )
            }))
    }
    reload = async () => {
        try {
            var partycode;
            var p;
            var b = this.state.parties;
            for (p = 0; p < b.length; p++) {
                if (b[p][1] == this.state.cparty) {
                    partycode = b[p][1];
                    break;
                }
            }

            var partymembers = await AsyncStorage.getItem(partycode).catch((reason) => {
                console.log(reason);
            });
            partymembers = JSON.parse(partymembers)["@graph"];
            var pos = this.state.pos;
            var data = [];
            var cos = 0;
            for (var i = pos; cos < pos + 20 && i < b[p][2]; i++) {
                var m = partymembers[i];
                if (m["@type"]) {
                    var pt = partycode;
                    var name = m.personGivenName;
                    var fname = m.personFamilyName;
                    var con = m.memberHasParliamentaryIncumbency.seatIncumbencyHasHouseSeat.houseSeatHasConstituencyGroup.constituencyGroupName;
                    var colour = "";
                    var id = "null";
                    if (m.memberHasMemberImage) {
                        id = m.memberHasMemberImage["@id"];
                    }

                    if (pt == "Labour") {
                        colour = "red";
                    }
                    if (pt == "Conservative") {
                        colour = "blue"
                    }
                    if (pt == "Independant") {
                        colour = "pink"
                    }
                    console.log(p2c);
                    m["party"] = pt
                    m["colour"] = p2c.party2colour(pt);
                    m["con"] = con;
                    m["name"] = name;
                    m["fname"] = fname;
                    m["uri"] = picprefix + id + picuri;
                    m["id"] = id;
                    data.push(m);
                    cos++;
                }
            }
            this.setState({
                mpjson: data,
                loading: false,
                filtered: data
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    onSearch = (search) => {
        console.log(search);
        this.setState(
            {
                search: search
            }
        )
        /*var c = 0;
        var x = [];
        var l = search.length();
        for (var i = 0; i < this.state.mpjson.length(); i++) {
            var item = this.state.mpjson[i];
            if (item.personGivenName.substring(0, l) == search.valueOf()) {
                x.push(item);
                c++;
            }
            else if (item.personFamilyName.substring(0, l) == search.valueOf()) {
                x.push(item);
                c++;
            }
            if (c > 10) {
                break;
            }
        }
        this.setState({
            filtered: x,
            loading: false
        })*/
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        }
        else {
            return (
                <View style={styles.MPContent}>

                    <View>
                        <View>
                            <SearchBar
                                placeholder="Search here..."
                                onChangeText={this.onSearch}
                                value={this.state.search}
                                style={styles.searchbar}
                                lightTheme={true}
                            />
                            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent:"space-evenly" }}>
                                {this.listbuttons()}
                            </View>
                        </View>
                        <FlatList
                            data={this.state.filtered}
                            numColumns={2}
                            style={{ flexDirection: "column", width: "100%", height: "100%" }}
                            contentContainerStyle={{ justifyContent: "center", alignItems: "center", flexGrow: 1 }}
                            renderItem={({ item, index }) => {

                                if (item.personGivenName) {
                                    return (
                                        <MPRow style={styles.MPRow} item={item} index={index} />
                                    )
                                }
                            }
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    MPContent: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#efefef",


    },
    MPRow: {
        width: 150,
        height: 150,
        backgroundColor: "#FFFFFF",
        padding: 10,
        margin: "2.5%",
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowColor: "#000",
        elevation: 2,
        borderLeftWidth: 3,

    },
    choices:
    {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        height: 50,
    },
    MPTop: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "flex-start",
        margin: 10,
    },
    MPTitle: {
        fontFamily: "LucidaGrande",
        fontSize: 14,
    },
    MPCon: {
        fontFamily: "LucidaGrande",
        fontSize: 11,
    },
    MPImg: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
    },
    searchbar: {

    }

});