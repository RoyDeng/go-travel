import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ADD_ITEM } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    onSubmit: payload =>
        dispatch({ type: ADD_ITEM, payload })
});

class ItemInput extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            startedAt: '',
            endedAt: ''
        };

        this.setName = ev => {
            this.setState({ name: ev.target.value });
        };

        this.createItem = ev => {
            ev.preventDefault();
            const payload = agent.Items.create(this.props.id,
                { name: this.state.name });
            this.setState({ name: '' });
            this.props.onSubmit(payload);
        };
    }

    render() {
        return (
            <form className="card comment-form" onSubmit={this.createItem}>
                <div className="card-block">
                    <textarea className="form-control"
                        placeholder="名稱"
                        value={this.state.name}
                        onChange={this.setName}
                        rows="3">
                    </textarea>
                </div>
                <div className="card-footer">
                    <button
                        className="btn btn-sm btn-primary"
                        type="submit">
                        儲存</button>
                </div>
            </form>
        );
    }
}

export default connect(() => ({}), mapDispatchToProps)(ItemInput);