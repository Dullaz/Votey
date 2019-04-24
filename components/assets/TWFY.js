const key = "GkPsgbCeosM9FS4myyEotpUF";
const url = "https://www.theyworkforyou.com/api/";

export function getMPs(party) {
    var uri = url + "getMPs?party=" + party + "&output=js&key=" + key;
    return uri;
}
export function getDebates(pid) {
    var uri = url + "getDebates?type=commons&person=" + pid + "&output=js&key=" + key;
    return uri;
}

