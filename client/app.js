import React, { Component } from "react";

import Header from "./containers/Header";
import SubHeader from "./components/layout/SubHeader";
import Routes from "./Routes";

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <SubHeader />
                <Routes />
            </div>
        );
    }
}
