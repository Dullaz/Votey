import React from 'react';
import FirebaseLogin from "../assets/FirebaseLogin"
import navigationService from "../services/navigationService";

export default class Login extends React.Component {
    render() {
        return (<FirebaseLogin login={user => navigationService.navigateAndReset("Menu", { user: user })} />)
    }
}