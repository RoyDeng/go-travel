import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_ITEM } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    onClick: (payload, itemId) =>
        dispatch({ type: DELETE_ITEM, payload, itemId })
});

const DeleteButton = props => {
    const del = () => {
        const payload = agent.Items.delete(props.id, props.itemId);
        props.onClick(payload, props.itemId);
    };

    if (props.show) {
        return (
            <span className="mod-options">
                <i className="ion-trash-a" onClick={del}></i>
            </span>
        );
    }
    return null;
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);