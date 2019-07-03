import JourneyActions from './JourneyActions';
import React from 'react';

const JourneyMeta = props => {
    const journey = props.journey;
    return (
        <div className="journey-meta">

            <div className="info">
                <span className="date">
                    {new Date(journey.createdAt).toDateString()}
                </span>
            </div>

            <JourneyActions canModify={props.canModify} journey={journey} />
        </div>
    );
};

export default JourneyMeta;