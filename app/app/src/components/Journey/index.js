import JourneyMeta from './JourneyMeta';
import ItemContainer from './ItemContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { JOURNEY_PAGE_LOADED, JOURNEY_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.journey,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: JOURNEY_PAGE_LOADED, payload }),
    onUnload: () =>
        dispatch({ type: JOURNEY_PAGE_UNLOADED })
});

class Journey extends React.Component {
    componentWillMount() {
        this.props.onLoad(Promise.all([
            agent.Journeys.get(this.props.match.params.id),
            agent.Items.forJourney(this.props.match.params.id)
        ]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        if (!this.props.journey) {
            return null;
        }

        const markup = { __html: marked(this.props.journey.body, { sanitize: true }) };
        const canModify = this.props.currentUser &&
            this.props.currentUser.username === this.props.journey.author.username;
        return (
            <div className="journey-page">

                <div className="banner">
                    <div className="container">

                        <h1>{this.props.journey.title}</h1>
                        <JourneyMeta
                            journey={this.props.journey}
                            canModify={canModify} />

                    </div>
                </div>

                <div className="container page">

                    <div className="row journey-content">
                        <div className="col-xs-12">

                            <div dangerouslySetInnerHTML={markup}></div>

                            <ul className="tag-list">
                                {
                                    this.props.journey.tagList.map(tag => {
                                        return (
                                            <li
                                                className="tag-default tag-pill tag-outline"
                                                key={tag}>
                                                {tag}
                                            </li>
                                        );
                                    })
                                }
                            </ul>

                        </div>
                    </div>

                    <hr />

                    <div className="journey-actions">
                    </div>

                    <div className="row">
                        <ItemContainer
                            items={this.props.items || []}
                            errors={this.props.commentErrors}
                            id={this.props.match.params.id}
                            journey={this.props.journey}
                            currentUser={this.props.currentUser} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journey);