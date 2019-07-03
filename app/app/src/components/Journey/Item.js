import DeleteButton from './DeleteButton';
import React from 'react';

const Item = props => {
    const item = props.item;
    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{item.body}</p>
            </div>
            <div className="card-footer">
                <span className="date-posted">
                    {new Date(item.createdAt).toDateString()}
                </span>
                <DeleteButton id={props.id} itemId={item.id} />
            </div>
        </div>
    );
};

export default Item;