import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_JOURNEY } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    onClickDelete: payload =>
        dispatch({ type: DELETE_JOURNEY, payload })
});

const JourneyActions = props => {
    const journey = props.journey;
    const del = () => {
        props.onClickDelete(agent.Journeys.del(journey.id))
    };
    if (props.canModify) {
        return (
            <span>

                <Link
                    to={`/edit/${journey.id}`}
                    className="btn btn-outline-secondary btn-sm">
                    <i className="ion-edit"></i> 編輯</Link>

                <button className="btn btn-outline-danger btn-sm" onClick={del}>
                    <i className="ion-trash-a"></i> 刪除</button>

            </span>
        );
    }

    return (
        <span>
        </span>
    );
};

export default connect(() => ({}), mapDispatchToProps)(JourneyActions);