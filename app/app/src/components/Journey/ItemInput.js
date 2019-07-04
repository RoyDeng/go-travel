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

        this.setStartTime = ev => {
            this.setState({ startedAt: ev.target.value });
        };

        this.setEndTime = ev => {
            this.setState({ endedAt: ev.target.value });
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
        if (this.props.isUser) {
            return (
                <form className="card comment-form" onSubmit={this.createItem}>
                    <div className="card-block">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="名稱"
                            value={this.state.name}
                            onChange={this.setName} />
                        <input
                            className="form-control"
                            type="text"
                            placeholder="開始時間"
                            value={this.state.startedAt}
                            onChange={this.setStartTime} />
                        <input
                            className="form-control"
                            type="text"
                            placeholder="結束時間"
                            value={this.state.endedAt}
                            onChange={this.setEndTime} />
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
        return null;
    }
}

export default connect(() => ({}), mapDispatchToProps)(ItemInput);