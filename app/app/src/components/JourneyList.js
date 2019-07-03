import JourneyPreview from './JourneyPreview';
import ListPagination from './ListPagination';
import React from 'react';

const JourneyList = props => {
    if (!props.journeys) {
        return (
            <div className="journey-preview">載入中...</div>
        );
    }

    if (props.journeys.length === 0) {
        return (
            <div className="journey-preview">還沒有旅程。</div>
        );
    }

    return (
        <div>
            {
                props.journeys.map(journey => {
                    return (
                        <JourneyPreview journey={journey} key={journey.id} />
                    );
                })
            }

            <ListPagination
                pager={props.pager}
                journeysCount={props.journeysCount}
                currentPage={props.currentPage} />
        </div>
    );
};

export default JourneyList;