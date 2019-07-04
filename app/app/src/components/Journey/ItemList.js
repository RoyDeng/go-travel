import Item from './Item';
import React from 'react';

const ItemList = props => {
    return (
        <div>
            {
                props.items.map(item => {
                    return (
                        <Item
                            item={item}
                            currentUser={props.currentUser}
                            id={props.id}
                            key={item.id} />
                    );
                })
            }
        </div>
    );
};

export default ItemList;