import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Journey from '../components/Journey';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import FavoriteJourneys from '../components/FavoriteJourneys';
import Register from '../components/Register';
import ProfileEditor from '../components/ProfileEditor';
import { store } from '../store';
import { push } from 'react-router-redux';

const mapStateToProps = state => {
    return {
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        currentUser: state.common.currentUser,
        redirectTo: state.common.redirectTo
    }
};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT })
});

class App extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            store.dispatch(push(nextProps.redirectTo));
            this.props.onRedirect();
        }
    }

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }

        this.props.onLoad(token ? agent.Auth.current() : null, token);
    }

    render() {
        if (this.props.appLoaded) {
            return (
                <div>
                    <Header
                        appName={this.props.appName}
                        currentUser={this.props.currentUser} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/editor/:id" component={Editor} />
                        <Route path="/editor" component={Editor} />
                        <Route path="/journey/:id" component={Journey} />
                        <Route path="/edit_profile" component={ProfileEditor} />
                        <Route path="/@:username/favorites" component={FavoriteJourneys} />
                        <Route path="/@:username" component={Profile} />
                    </Switch>
                </div>
            );
        }
        return (
            <div>
                <Header
                    appName={this.props.appName}
                    currentUser={this.props.currentUser} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);