import DeleteButton from './DeleteButton';
import React from 'react';

const Item = props => {
    const item = props.item;
    const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{item.name}</p>
                <p className="card-text">{item.startedAt} ~ {item.endedAt}</p>
            </div>
            <div className="card-footer">
                <DeleteButton show={show} id={props.id} itemId={item.id} />
            </div>
        </div>
    );
};

export default Item;