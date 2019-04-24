export function party2colour(party) {
    switch (party.toLowerCase()) {
        case "conservative":
            return "blue";
            break
        case "labour":
            return "red";
            break

        case "independent":
            return "#666666";
            break
        case "liberal democrat":
            return "yellow";
            break
        case "green party":
            return "green";
            break
        case "speaker":
            return "black";
            break
        case "Change UK – The Independent Group".toLowerCase():
            return "#ff00ff";
            break
        case "democratic unionist party":
            return "#800000";
            break
        case "scottish national party":
            return "orange";
            break
        case "sinn féin":
            return "green";
            break
        case "plaid cymru":
            return "green";
            break
    }
}