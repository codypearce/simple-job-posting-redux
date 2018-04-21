import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login, logout } from "../actions/authActions";

import HeaderUI from "../components/layout/HeaderUI";

class Header extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        login: PropTypes.func,
        history: PropTypes.object,
        error: PropTypes.string,
        logout: PropTypes.func
    };

    render() {
        const { isLoggedIn, login, logout, history, error } = this.props;
        return (
            <HeaderUI
                isLoggedIn={isLoggedIn}
                login={login}
                logout={logout}
                history={history}
                error={error}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: user => dispatch(login(user)),
        logout: () => dispatch(logout())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
