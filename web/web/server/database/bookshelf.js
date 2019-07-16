import config from './knexfile';
import { NODE_ENV } from '../config/env';
import Knex from 'knex';
import Bookshelf from 'bookshelf';
import BookshelfUuid from 'bookshelf-uuid';
import CascadeDelete from 'bookshelf-cascade-delete';

const environment = NODE_ENV || 'development';

const knex = Knex(config[environment]);
const bookshelf = Bookshelf(knex);

bookshelf.plugin(BookshelfUuid);
bookshelf.plugin(CascadeDelete);

export default bookshelf;