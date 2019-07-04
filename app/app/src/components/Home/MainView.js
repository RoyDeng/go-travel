import LayerList from '../Layer/List';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

const YourJourneyTab = props => {
    if (props.token) {
        const clickHandler = ev => {
            ev.preventDefault();
            props.onTabClick('source', agent.Journeys.source, agent.Journeys.source());
        }

        return (
            <li className="nav-item">
                <a href=""
                    className={props.tab === 'source' ? 'nav-link active' : 'nav-link'}
                    onClick={clickHandler}>
                    你的旅程</a>
            </li>
        );
    }
    return null;
};

const PublicJourneyTab = props => {
    const clickHandler = ev => {
        ev.preventDefault();
        props.onTabClick('all', agent.Journeys.all, agent.Journeys.all());
    };
    return (
        <li className="nav-item">
            <a
                href=""
                className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
                onClick={clickHandler}>
                公開旅程</a>
        </li>
    );
};

const TagFilterTab = props => {
    if (!props.tag) {
        return null;
    }

    return (
        <li className="nav-item">
            <a href="" className="nav-link active">
                <i className="ion-pound"></i> {props.tag}
            </a>
        </li>
    );
};

const mapStateToProps = state => ({
    ...state.journeyList,
    tags: state.home.tags,
    token: state.common.token
});

const mapDispatchToProps = dispatch => ({
    onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
    return (
        <div className="col-md-9">
            <div className="source-toggle">
                <ul className="nav nav-pills outline-active">

                    <YourJourneyTab
                        token={props.token}
                        tab={props.tab}
                        onTabClick={props.onTabClick} />

                    <PublicJourneyTab tab={props.tab} onTabClick={props.onTabClick} />

                    <TagFilterTab tag={props.tag} />

                </ul>
            </div>

            <LayerList
                pager={props.pager}
                layers={props.layers}
                loading={props.loading}
                journeysCount={props.journeysCount}
                currentPage={props.currentPage} />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);