import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
    PROFILE_SAVED,
    PROFILE_PAGE_UNLOADED,
    LOGOUT
} from '../constants/actionTypes';

class ProfileForm extends React.Component {
    constructor() {
        super();

        this.state = {
            image: '',
            username: '',
            bio: '',
            email: '',
            password: ''
        };

        this.updateState = field => ev => {
            const state = this.state;
            const newState = Object.assign({}, state, { [field]: ev.target.value });
            this.setState(newState);
        };

        this.submitForm = ev => {
            ev.preventDefault();

            const user = Object.assign({}, this.state);
            if (!user.password) {
                delete user.password;
            }

            this.props.onSubmitForm(user);
        };
    }

    componentWillMount() {
        if (this.props.currentUser) {
            Object.assign(this.state, {
                image: this.props.currentUser.image || '',
                username: this.props.currentUser.username,
                bio: this.props.currentUser.bio,
                email: this.props.currentUser.email
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser) {
            this.setState(Object.assign({}, this.state, {
                image: nextProps.currentUser.image || '',
                username: nextProps.currentUser.username,
                bio: nextProps.currentUser.bio,
                email: nextProps.currentUser.email
            }));
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="照片"
                            value={this.state.image}
                            onChange={this.updateState('image')} />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="使用者名稱"
                            value={this.state.username}
                            onChange={this.updateState('username')} />
                    </fieldset>

                    <fieldset className="form-group">
                        <textarea
                            className="form-control form-control-lg"
                            rows="8"
                            placeholder="簡介"
                            value={this.state.bio}
                            onChange={this.updateState('bio')}>
                        </textarea>
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.updateState('email')} />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="新密碼"
                            value={this.state.password}
                            onChange={this.updateState('password')} />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={this.state.inProgress}>
                        儲存</button>

                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    ...state.profileEditor,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({ type: LOGOUT }),
    onSubmitForm: user =>
        dispatch({ type: PROFILE_SAVED, payload: agent.Auth.save(user) }),
    onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class ProfileEditor extends React.Component {
    render() {
        return (
            <div className="profile-editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">

                            <h1 className="text-xs-center">個人資訊</h1>

                            <ListErrors errors={this.props.errors}></ListErrors>

                            <ProfileForm
                                currentUser={this.props.currentUser}
                                onSubmitForm={this.props.onSubmitForm} />

                            <hr />

                            <button
                                className="btn btn-outline-danger"
                                onClick={this.props.onClickLogout}>
                                登出</button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);