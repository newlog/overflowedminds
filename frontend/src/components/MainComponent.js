import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './HomeComponent'
import Menu from './LeftMenuComponent';
import '../App.css'
import Footer from './FooterComponent';
import Writings from './WritingsComponent';


class Main extends Component {
    render() {
        const {
            location,
          } = this.props;
        return (
            <div className="main">
                <Menu />
                <Switch location={location}>
                    <Route path="/home" component={HomePage} />
                    <Route path="/writings" component={Writings} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
