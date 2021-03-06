import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "./Modal";

export default class LoginModal extends Component {
    static propTypes = {
        login: PropTypes.func,
        error: PropTypes.string
    };
    render() {
        return (
            <Modal
                title="Login"
                modalButton="Login"
                button="Login"
                modal="loginModal"
                primaryFunc={user => this.props.login(user)}
                error={this.props.error}
            />
        );
    }
}
