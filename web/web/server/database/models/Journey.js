import bookshelf from '../bookshelf';

import Item from './Item';

export default bookshelf.Model.extend(
    {
        tableName: 'journeys',
        hasTimestamps: true,
        uuid: true,
        items: function () {
            return this.hasMany(Item);
        }
    }, {
        dependents: ['items']
    }
);