import bookshelf from '../bookshelf';

export default bookshelf.Model.extend({
    tableName: 'items',
    hasTimestamps: true,
    uuid: true
});