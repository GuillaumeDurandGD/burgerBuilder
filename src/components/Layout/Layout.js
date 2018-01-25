import React, {Component} from 'react';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    drawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    };

    render() {
        return (
            <React.Fragment>
                <Toolbar drawerToggleClicked={this.drawerToggleHandler.bind(this)} />
                <SideDrawer
                    show={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler.bind(this)} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
};

export default Layout;