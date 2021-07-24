import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './HomeComponent'
import Menu from './LeftMenuComponent';
import '../App.css'
import Footer from './FooterComponent';
import Writings from './WritingsComponent';
import WritingDetails from './WritingDetailsComponent';


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
                    <Route path="/writings" exact={true} component={Writings} />
                    <Route path="/writings/:writingSlug" component={WritingDetails} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
