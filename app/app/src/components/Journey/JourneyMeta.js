import JourneyActions from './JourneyActions';
import { Link } from 'react-router-dom';
import React from 'react';

const JourneyMeta = props => {
    const journey = props.journey;
    return (
        <div className="journey-meta">
            <Link to={`/@${journey.author.username}`}>
                <img src={journey.author.image} alt={journey.author.username} />
            </Link>

            <div className="info">
                <Link to={`/@${journey.author.username}`} className="author">
                    {journey.author.username}
                </Link>
                <span className="date">
                    {new Date(journey.createdAt).toDateString()}
                </span>
            </div>

            <JourneyActions canModify={props.canModify} journey={journey} />
        </div>
    );
};

export default JourneyMeta;