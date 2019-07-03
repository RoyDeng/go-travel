import ItemInput from './ItemInput';
import ItemList from './ItemList';
import { Link } from 'react-router-dom';
import React from 'react';

const ItemContainer = props => {
    if (props.currentUser) {
        return (
            <div className="col-xs-12 col-md-8 offset-md-2">
                <div>
                    <list-errors errors={props.errors}></list-errors>
                    <ItemInput id={props.id} />
                </div>

                <CommentList
                    items={props.items}
                    id={props.id} />
            </div>
        );
    } else {
        return (
            <div className="col-xs-12 col-md-8 offset-md-2">
                <p>
                    <Link to="/login">登入</Link>
                    &nbsp;or&nbsp;
                    <Link to="/register">註冊</Link>
                </p>

                <ItemList
                    comments={props.comments}
                    id={props.id} />
            </div>
        );
    }
};

export default ItemContainer;