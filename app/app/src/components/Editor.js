import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
    ADD_TAG,
    EDITOR_PAGE_LOADED,
    REMOVE_TAG,
    JOURNEY_SUBMITTED,
    EDITOR_PAGE_UNLOADED,
    UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.editor
});

const mapDispatchToProps = dispatch => ({
    onAddTag: () =>
        dispatch({ type: ADD_TAG }),
    onLoad: payload =>
        dispatch({ type: EDITOR_PAGE_LOADED, payload }),
    onRemoveTag: tag =>
        dispatch({ type: REMOVE_TAG, tag }),
    onSubmit: payload =>
        dispatch({ type: JOURNEY_SUBMITTED, payload }),
    onUnload: payload =>
        dispatch({ type: EDITOR_PAGE_UNLOADED }),
    onUpdateField: (key, value) =>
        dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class Editor extends React.Component {
    constructor() {
        super();

        const updateFieldEvent =
            key => ev => this.props.onUpdateField(key, ev.target.value);
        this.changeTitle = updateFieldEvent('title');
        this.changeDescription = updateFieldEvent('description');
        this.changeTagInput = updateFieldEvent('tagInput');

        this.watchForEnter = ev => {
            if (ev.keyCode === 13) {
                ev.preventDefault();
                this.props.onAddTag();
            }
        };

        this.removeTagHandler = tag => () => {
            this.props.onRemoveTag(tag);
        };

        this.submitForm = ev => {
            ev.preventDefault();
            const journey = {
                title: this.props.title,
                description: this.props.description,
                tagList: this.props.tagList
            };

            const id = { id: this.props.id };
            const promise = this.props.id ?
                agent.Journeys.update(Object.assign(journey, id)) :
                agent.Journeys.create(journey);

            this.props.onSubmit(promise);
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            if (nextProps.match.params.id) {
                this.props.onUnload();
                return this.props.onLoad(agent.Journeys.get(this.props.match.params.id));
            }
            this.props.onLoad(null);
        }
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            return this.props.onLoad(agent.Journeys.get(this.props.match.params.id));
        }
        this.props.onLoad(null);
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">

                            <ListErrors errors={this.props.errors}></ListErrors>

                            <form>
                                <fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="標題"
                                            value={this.props.title}
                                            onChange={this.changeTitle} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="說明"
                                            value={this.props.description}
                                            onChange={this.changeDescription} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter tags"
                                            value={this.props.tagInput}
                                            onChange={this.changeTagInput}
                                            onKeyUp={this.watchForEnter} />

                                        <div className="tag-list">
                                            {
                                                (this.props.tagList || []).map(tag => {
                                                    return (
                                                        <span className="tag-default tag-pill" key={tag}>
                                                            <i className="ion-close-round"
                                                                onClick={this.removeTagHandler(tag)}>
                                                            </i>
                                                            {tag}
                                                        </span>
                                                    );
                                                })
                                            }
                                        </div>
                                    </fieldset>

                                    <button
                                        className="btn btn-lg pull-xs-right btn-primary"
                                        type="button"
                                        disabled={this.props.inProgress}
                                        onClick={this.submitForm}>
                                        儲存</button>

                                </fieldset>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);