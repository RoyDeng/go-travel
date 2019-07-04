import ItemInput from './ItemInput';
import ItemList from './ItemList';
import { Link } from 'react-router-dom';
import React from 'react';

const ItemContainer = props => {
    if (props.currentUser) {
        const isUser = this.props.currentUser.username === this.props.journey.author.username;
        return (
            <div className="col-xs-12 col-md-8 offset-md-2">
                if () {
                    <div>
                        <list-errors errors={props.errors}></list-errors>
                        <ItemInput isUser={isUser} id={props.id} />
                    </div>
                }

                <ItemList
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
                    id={props.id}
                    currentUser={props.currentUser} />
            </div>
        );
    }
};

export default ItemContainer;