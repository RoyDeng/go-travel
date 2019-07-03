import React from 'react';
import { Link } from 'react-router-dom';

const JourneyPreview = props => {
    const journey = props.journey;
    return (
        <div className="journey-preview">
            <div className="journey-meta">
                <div className="info">
                    <span className="date">
                        {new Date(journey.createdAt).toDateString()}
                    </span>
                </div>
            </div>

            <Link to={`/journey/${journey.id}`} className="preview-link">
                <h1>{journey.title}</h1>
                <p>{journey.description}</p>
                <span>查看</span>
                <ul className="tag-list">
                    {
                        journey.tagList.map(tag => {
                            return (
                                <li className="tag-default tag-pill tag-outline" key={tag}>
                                    {tag}
                                </li>
                            )
                        })
                    }
                </ul>
            </Link>
        </div>
    );
}

export default JourneyPreview;